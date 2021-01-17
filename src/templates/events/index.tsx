import React, { FunctionComponent } from "react"
import SEO from "utils/seo"
import { Container, Footer, Header, Markdown } from "components/layout"
import { EventData, PagesData } from "models"
import { EventsFeed } from "features/events/eventsFeed"
import { graphql, PageProps } from "gatsby"

const EventsPage: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
    allAirtablemeetups: {
      totalCount: number
      nodes: Array<{
        data: EventData
      }>
    }
  }>
> = ({ data, location }) => {
  return (
    <>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>
        <EventsFeed events={data.allAirtablemeetups.nodes} />
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    airtablepages(id: { eq: $id }) {
      data {
        title
        slug
        content
        description
      }
    }
    allAirtablemeetups(sort: { fields: data___Date, order: DESC }) {
      totalCount
      nodes {
        data {
          Address
          Company {
            data {
              Name
              Slug
            }
          }
          Completed
          Date(locale: "ru", formatString: "LLL")
          Formatted_title
          Long_Announcement
          Publish
          Registration_link
          Short_Announcement
          Slug
          Stream_link
          Talks {
            data {
              Title
              Slides_URL
              Theses
              Record
              Speakers {
                data {
                  Name
                  Company
                  Photo {
                    localFiles {
                      childImageSharp {
                        fluid(
                          cropFocus: CENTER
                          quality: 80
                          grayscale: true
                          maxWidth: 300
                          maxHeight: 300
                          fit: COVER
                        ) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          Title
          Type
          Video_link
          Venue {
            data {
              Slug
              Name
            }
          }
        }
      }
    }
  }
`

export default EventsPage
