import path from 'node:path'
import assert from 'node:assert/strict'
import type { CreatePagesArgs, GatsbyNode } from 'gatsby'

import { config } from './config'
import { speakerPath, talkPath, pagePath, eventPath } from './src/utils/paths'
import type {
  Page,
  Paper,
  Speaker,
  Talk,
  Meetup,
  WrappedWithDirectus,
} from './src/models'

const FETCH_GRAPHQL_QUERY_LIMIT = config.isBuildMode ? 100 : 10

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  stage,
  plugins,
}) => {
  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: 'process/browser' })],
    })
  }
}

type GraphqlDirectusPersons = {
  persons: Array<Pick<Speaker, 'id' | 'name'>>
}
type GraphqlDirectusTalks = {
  talks: Array<Pick<Talk<never, never, Pick<Paper, 'title'>>, 'id' | 'paper'>>
}
type GraphqlDirectusEvents = {
  meetups: Array<Pick<Meetup, 'id' | 'slug' | 'title'>>
}
type GraphqlDirectusPages = {
  pages: Array<Pick<Page, 'id' | 'slug' | 'template'>>
}

type GraphqlDirectusData = {
  [key: string]: Array<unknown>
}

async function* fetchGraphqlQuery<TQueryResult extends GraphqlDirectusData>(
  graphql: CreatePagesArgs['graphql'],
  buildQueryFunction: Function,
  arrayField: keyof TQueryResult
): AsyncGenerator<TQueryResult[keyof TQueryResult]> {
  let hasNextPage = true
  let currentPage = 0

  while (hasNextPage) {
    const query = buildQueryFunction(FETCH_GRAPHQL_QUERY_LIMIT, currentPage)
    const result = await graphql<WrappedWithDirectus<TQueryResult>>(query)

    assert(result.data, 'GraphqlDataError')
    const arrayFieldData = result.data.directus[arrayField]
    assert(Array.isArray(arrayFieldData), 'GraphqlDataArrayFieldError')

    yield arrayFieldData

    console.log(`fetched ${arrayFieldData.length} ${String(arrayField)}`)

    if (!config.isBuildMode) {
      hasNextPage = false
      continue
    }

    if (arrayFieldData.length < FETCH_GRAPHQL_QUERY_LIMIT) {
      hasNextPage = false
      continue
    } else {
      currentPage += arrayFieldData.length
    }
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  function personsQuery(limit: number, offset: number): string {
    const query = `
      query {
        directus {
          persons(limit: ${limit}, offset: ${offset}) {
            id
            name
          }
        }
      }
    `
    return query
  }

  function talksQuery(limit: number, offset: number): string {
    const query = `
      query {
        directus {
          talks(limit: ${limit}, offset: ${offset}) {
            id
            paper {
			        title
		        }
          }
        }
      }
    `
    return query
  }

  function eventsQuery(limit: number, offset: number): string {
    const query = `
      query {
        directus {
          meetups(limit: ${limit}, offset: ${offset}) {
            id
            slug
            title
          }
        }
      }
    `
    return query
  }

  function pagesQuery(limit: number, offset: number): string {
    const query = `
      query {
        directus {
          pages(
            filter: {
              _and: [
                { template: { _in: ["speakers", "page", "events", "contacts", "cfp", "qna"] } }
                { status: { _eq: "published" } }
              ]
            }
            limit: ${limit}, offset: ${offset}
          ) {
            id
            slug
            template
          }
        }
      }
    `
    return query
  }

  for await (const persons of fetchGraphqlQuery<GraphqlDirectusPersons>(
    graphql,
    personsQuery,
    'persons'
  )) {
    persons.forEach(person => {
      createPage({
        path: speakerPath(person.name),
        component: path.resolve(
          config.gatsby.src,
          'templates/speaker/index.tsx'
        ),
        context: { id: person.id },
      })
    })
  }

  for await (const talks of fetchGraphqlQuery<GraphqlDirectusTalks>(
    graphql,
    talksQuery,
    'talks'
  )) {
    talks.forEach(talk => {
      if (!talk.paper.title) {
        console.error('Talk wrong format', talk.id)
        return
      }

      createPage({
        path: talkPath(talk.paper.title),
        component: path.resolve(config.gatsby.src, 'templates/talk/index.tsx'),
        context: { id: talk.id },
      })
    })
  }

  for await (const events of fetchGraphqlQuery<GraphqlDirectusEvents>(
    graphql,
    eventsQuery,
    'meetups'
  )) {
    events.forEach(event => {
      createPage({
        path: eventPath(event.slug),
        component: path.resolve(config.gatsby.src, 'templates/event/index.tsx'),
        context: { id: event.id },
      })
    })
  }

  for await (const pages of fetchGraphqlQuery<GraphqlDirectusPages>(
    graphql,
    pagesQuery,
    'pages'
  )) {
    pages.forEach(page => {
      createPage({
        path: pagePath(page.slug),
        component: path.resolve(
          config.gatsby.src,
          `templates/${page.template}/index.tsx`
        ),
        context: { id: page.id },
      })
    })
  }
}
