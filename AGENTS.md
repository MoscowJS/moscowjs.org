# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, Cursor, etc.) when working with code in this repository. `CLAUDE.md` is a symlink to this file.

## Project overview

Gatsby (v4, React 17, TypeScript) site for moscowjs.org. Content (pages, speakers, talks, meetups, partners, config) is sourced at build time from a headless Directus CMS via GraphQL (`@directus/gatsby-source-directus`). A small set of interactive features (Q&A during talks, login) run client-side against Firebase (Auth + Realtime Database).

## Commands

```
npm run develop      # gatsby develop with dotenv loaded — local dev server
npm run build        # gatsby build — must pass before opening a PR
npm run serve        # serve the production build locally
npm run clean        # gatsby clean (clear .cache/public, fixes stale graphql/type errors)
npm run lint:tsc     # tsc --noEmit (typecheck only, incremental)
npm run lint:prettier # prettier . --check
npm run deploy       # gatsby build --prefix-paths && gh-pages -d public
```

There is no real test suite (`npm test` is a placeholder that exits 1).

Node version is pinned via `.nvmrc` (20.16.0) — use `n auto` or `nvm use`.

Pre-commit (husky + lint-staged) runs `tsc --noEmit` and `prettier --write` on staged `*.{js,ts,json,md,y*ml}` files. Don't bypass this with `--no-verify`.

### Local setup

Requires a `.env` (copy from `.env.example`). Required vars, validated at import-time by `config.ts` (throws if missing): `GATSBY_SRC_ROOT`, `SITE_URL`, `DIRECTUS_URL`, `DIRECTUS_TOKEN`, `GATSBY_BFF_API_URL`. `DIRECTUS_TOKEN` is a personal access token from the Directus admin panel. Set `GATSBY_PRINT_CONFIG=true` to log the (secret-obfuscated) resolved config on startup.

## Architecture

### Data flow: Directus → GraphQL → pages

All content lives in Directus, not in the repo. `gatsby-config.ts` registers `@directus/gatsby-source-directus`, which exposes Directus collections under the `directus` GraphQL namespace (queried in page/template components via `graphql` template tags, e.g. `directus { pages_by_id(id: $id) { ... } }`).

`gatsby-node.ts` (`createPages`) is the entry point for static page generation. It paginates through four Directus collections using `fetchGraphqlQuery` (an async generator) and calls `createPage` for each:

- `persons` → `/speakers/:name/` → `templates/speaker`
- `talks` → `/talks/:title/` → `templates/talk`
- `meetups` → `/events/:slug/` → `templates/event`
- `pages` (filtered by `template in [speakers, page, events, contacts, cfp, qna]` and `status = published`) → `/:slug/` → `templates/<template>` (template name comes directly from the Directus `template` field, so the directory under `src/templates/` must match exactly)

Page paths are built by `src/utils/paths.ts` (`speakerPath`, `talkPath`, `eventPath`, `pagePath`), which all funnel through a shared `slugify` (uses `src/utils/charMap.ts` to transliterate Cyrillic, lowercases, strips punctuation). Always reuse these helpers instead of building URLs by hand — page creation and any in-app links must produce identical paths.

`FETCH_GRAPHQL_QUERY_LIMIT` and pagination behavior differ between local dev (`config.isBuildMode === false`, single page of 10) and CI/production build (`GITHUB_ACTIONS_PR` unset → `isBuildMode = true`, paginates 100 at a time). The `pages` query always paginates regardless of mode (`buildMode = true` hardcoded in that call).

### Directory layout

- `src/templates/*` — one directory per Directus `template` value; each is a page-level component with its own `graphql` query, resolved dynamically by name from `gatsby-node.ts`.
- `src/features/*` — self-contained feature modules (qna, login, firebase, events, talks, speakers, partners, cfp), each typically with its own `hooks/` and barrel `index.ts`/`index.tsx`.
- `src/components/layout`, `src/components/elements`, `src/components/forms`, `src/components/icons` — shared, presentational UI building blocks (styled-components), independent of Directus/Firebase.
- `src/models/*.h.ts` — hand-written TypeScript types mirroring Directus collection shapes (not generated); `models/index.ts` re-exports them plus `WrappedWithDirectus<T>`, the generic wrapper for `{ directus: T }` GraphQL responses used throughout templates and `gatsby-node.ts`.
- `src/utils` — `paths.ts` (slugging/routing), `seo.tsx`, `transformConfig.ts` (flattens Directus `config` key/value rows into an object), `typography.ts` (react-typography config), `charMap.ts`.

### Firebase-backed Q&A feature (`src/features/qna`)

Separate from the Directus content pipeline — this is client-only, real-time state for live Q&A during talks. Login (`src/features/login`) authenticates via Firebase Auth (see `firebaseui` usage); `src/features/firebase/index.ts` is a singleton (`FBApp.getInstance()`) wrapping `firebase.initializeApp` and exposing `auth()` / `database()`. Questions live under `questions/<sessionId>` in the Realtime Database; the active session id comes from Directus config (`type: "qna"`) via `SessionContext`, set per-page in `templates/qna/index.tsx`. Admin status (`useIsAdmin`) is looked up at `admins/<uid>` (global, not per-meetup). Because Firebase touches `window`, Q&A UI is loaded with `React.lazy` and gated on `typeof window !== 'undefined'` (see `templates/qna/index.tsx`) to avoid SSR breakage.

A visitor is signed in anonymously on page load (`useAdd`) and can submit a question, which is pushed unpublished to `questions/<sessionId>/<questionId>`. Admins publish (`useAdminActions.publish`), mark answered (`setAnswered`), or delete (`remove`) questions; other attendees can upvote published, unanswered questions (`useUpvote`, gated by `userCanVote` in `useQnaList`).

**To open Q&A for a new meetup:** in the Directus admin (Content → Config), edit the row named `session` (type `qna`) and set its `Value` to a new unique id (e.g. `mjs71`). Don't reuse a previous meetup's id, or new questions will mix with old ones in Firebase.

### Code style

- No semicolons, single quotes, `arrowParens: avoid` (prettier-enforced — see `.prettierrc`).
- 2-space indent, LF endings (`.editorconfig`).
- Path imports are relative (no `@/` alias) despite `baseUrl` in `tsconfig.json`.
