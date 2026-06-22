# MoscowJS — moscowjs.org

Site of MoscowJS, JavaScript meetup group in Moscow.

## Contributing

By contributing to moscowjs.org, you agree to abide by the [code of conduct](/code-of-conduct.md).

1. Fork the repo
2. Checkout the `main` branch
3. Install dependencies

```
git clone https://github.com/MoscowJS/moscowjs.org
cd moscowjs.org
n auto # or nvm use
npm install
```

4. Create a new branch from the develop branch.
5. Make your changes. Make sure the command `npm run build` is passing.
6. Commit and finally send a GitHub Pull Request with a clear list of what you've done (read more [about pull requests](https://help.github.com/articles/about-pull-requests/)). Make sure all of your commits are atomic (one feature per commit) and have meaningful commit messages.

## Development

### How to develop locally

1. Create env file
   - Retrieve directus token from Directus admin panel and put it to DIRECTUS_TOKEN value

```
cp .env.example .env
```

2. Run develop script

```
node --require dotenv/config node_modules/.bin/gatsby build -- --verbose
```

## Features

### Q&A (live talk questions)

The Q&A feature (`src/features/qna`) lets attendees ask questions during a talk in real time. It runs entirely client-side against Firebase (Auth + Realtime Database) and is independent of the Directus content pipeline.

- Each Q&A page (`templates/qna`) reads a `session` value from Directus config (`type: "qna"`) and provides it via `SessionContext`. This value (e.g. `mjs71`) scopes all questions for that specific meetup — `questions/<sessionId>/...` in the Realtime Database.
- **To open Q&A for a new meetup:** in the Directus admin (Content → Config), open the row named `session` (type `qna`) and change its `Value` to a new unique id (e.g. `mjs71`). Don't reuse a previous meetup's id, or new questions will mix with old ones in Firebase.
- A visitor is signed in anonymously on page load (`useAdd`, via `auth().signInAnonymously()`) so they can submit questions without creating an account.
- Submitting the form (`questionForm`) calls `useAdd`, which pushes a new node under `questions/<sessionId>/<questionId>` with `{ question, author, authorId, talk, created, published: false, answered: false }`, and stores the author's name/contacts under `users/<uid>`.
- New questions are unpublished by default and only visible to their author and admins until an admin publishes them (`useAdminActions.publish`, sets `published: true`).
- Attendees can upvote published, unanswered questions from others (not their own) — see `useUpvote` and the `userCanVote` logic in `useQnaList`.
- Admins (`admins/<uid>` in the Realtime Database, not per-meetup — global) can publish, mark as answered, or delete (`useAdminActions.remove`) any question via the `questionAdmin` controls.

## License

MIT License

Copyright (c) 2021 MoscowJS Team

See [LICENSE](/LICENSE). for full text.
