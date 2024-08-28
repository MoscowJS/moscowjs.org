import path from 'node:path'
import assert from 'node:assert/strict'
import type { GatsbyNode } from 'gatsby'

import { config } from './config'
import { speakerPath, talkPath } from './src/utils/paths'
import type { Speaker, Talk, WrappedWithDirectus } from './src/models'

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

type GraphqlDirectusPersonsTalks = {
  persons: Array<Pick<Speaker, 'id' | 'name'>>
  talks: Array<Pick<Talk, 'id' | 'title'>>
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const result = await graphql<
    WrappedWithDirectus<GraphqlDirectusPersonsTalks>
  >(`
    query {
      directus {
        persons(limit: 5) {
          id
          name
        }
        talks(limit: 5) {
          id
          title
        }
      }
    }
  `)

  console.log('----result', JSON.stringify(result, null, 2))

  assert(result.data, 'GraphqlDataError')

  result.data.directus.persons.forEach(person => {
    createPage({
      path: speakerPath(person.name),
      component: path.resolve(config.gatsby.src, 'templates/speaker/index.tsx'),
      context: { id: person.id },
    })
  })

  result.data.directus.talks.forEach(talk => {
    if (!talk.title) {
      console.error('Talk wrong format', talk.id)
      return
    }

    createPage({
      path: talkPath(talk.title),
      component: path.resolve(config.gatsby.src, 'templates/talk/index.tsx'),
      context: { id: talk.id },
    })
  })
}
