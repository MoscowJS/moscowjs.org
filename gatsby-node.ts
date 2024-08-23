// const path = require('path')
// const {
//   speakerPath,
// } = require("./src/utils/paths.ts")

import type { GatsbyNode } from 'gatsby'

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

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const result = await graphql(`
    query OtherPlaylistInfoQuery {
      directus {
        persons(limit: 3) {
          id
          name
          email
          telegram
        }
      }
    }
  `)

  console.log('----result', JSON.stringify(result, null, 2))

  // result.data.directus.persons.forEach((person) => {
  //   createPage({
  //     path: speakerPath(person.name),
  //     component: path.resolve(`./src/templates/speaker/index.tsx`),
  //     context: { id: person.id },
  //   })
  // })
}
