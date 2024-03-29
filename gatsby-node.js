const path = require(`path`)
const {
  eventPath,
  pagePath,
  speakerPath,
  talkPath,
} = require("./src/utils/paths.ts")

exports.onCreateWebpackConfig = ({ actions, stage, plugins }) => {
  if (stage === "build-javascript" || stage === "develop") {
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: "process/browser" })],
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allAirtablemeetups {
        totalCount
        nodes {
          id
          data {
            Slug
          }
        }
      }
      allAirtablepages(filter: { data: { published: { eq: true } } }) {
        nodes {
          id
          data {
            slug
            template
          }
        }
      }
      allAirtablespeakers {
        totalCount
        nodes {
          id
          data {
            Name
          }
        }
      }
      allAirtabletalks {
        totalCount
        nodes {
          id
          data {
            Title
          }
        }
      }
    }
  `)

  result.data.allAirtablemeetups.nodes.forEach(({ data, id }) => {
    createPage({
      path: eventPath(data.Slug),
      component: path.resolve(`./src/templates/event/index.tsx`),
      context: { id },
    })
  })

  result.data.allAirtablepages.nodes.forEach(({ data, id }) => {
    createPage({
      path: pagePath(data.customUrl || data.slug),
      component: path.resolve(`./src/templates/${data.template}/index.tsx`),
      context: { id },
    })
  })

  result.data.allAirtablespeakers.nodes.forEach(({ data, id }) => {
    createPage({
      path: speakerPath(data.Name),
      component: path.resolve(`./src/templates/speaker/index.tsx`),
      context: { id },
    })
  })

  result.data.allAirtabletalks.nodes.forEach(({ data, id }) => {
    if (!data.Title) {
      console.error(data)
      process.exit(1)
    }

    createPage({
      path: talkPath(data.Title),
      component: path.resolve(`./src/templates/talk/index.tsx`),
      context: { id },
    })
  })
}
