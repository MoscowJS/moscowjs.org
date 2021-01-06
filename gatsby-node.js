const path = require(`path`)
const { eventPath, pagePath, speakerPath } = require("./src/utils/paths.ts")

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
        nodes {
          id
          data {
            Name
          }
        }
        totalCount
      }
    }
  `)

  result.data.allAirtablemeetups.nodes.forEach(({ data, id }) => {
    createPage({
      path: eventPath(data.Slug),
      component: path.resolve(`./src/templates/meetup.tsx`),
      context: { id },
    })
  })

  result.data.allAirtablepages.nodes.forEach(({ data, id }) => {
    createPage({
      path: pagePath(data.customUrl || data.slug),
      component: path.resolve(`./src/templates/${data.template}.tsx`),
      context: { id },
    })
  })

  result.data.allAirtablespeakers.nodes.forEach(({ data, id }) => {
    createPage({
      path: speakerPath(data.Name),
      component: path.resolve(`./src/templates/speaker.tsx`),
      context: { id },
    })
  })
}
