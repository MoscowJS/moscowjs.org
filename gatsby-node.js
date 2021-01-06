const path = require(`path`)
const {
  eventPath,
  pagePath,
  speakerPath,
  talkPath,
} = require("./src/utils/paths.ts")

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

  result.data.allAirtabletalks.nodes.forEach(({ data, id }) => {
    createPage({
      path: talkPath(data.Title),
      component: path.resolve(`./src/templates/talk.tsx`),
      context: { id },
    })
  })
}
