import React, { FunctionComponent } from "react"
import SEO from "utils/seo"
import { Container, Footer, Header } from "components/layout"
import { graphql, PageProps } from "gatsby"
import { Talk } from "features/talks/talk"
import { TalkData } from "models"

const TalkPage: FunctionComponent<
  PageProps<{
    airtabletalks: { data: TalkData }
  }>
> = ({ data, location }) => {
  const talk = data.airtabletalks.data

  return (
    <>
      <SEO title={talk.Title} />
      <Header location={location} />
      <Container as="main">
        <Talk talk={talk} level={1} />
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query ($id: String!) {
    airtabletalks(id: { eq: $id }) {
      data {
        Date
        Title
        Record
        Slides_URL
        Publish
        Speakers {
          data {
            Name
            Photo {
              localFiles {
                childImageSharp {
                  fluid(
                    cropFocus: CENTER
                    quality: 80
                    grayscale: true
                    maxWidth: 150
                    maxHeight: 150
                    fit: COVER
                  ) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            Company
          }
        }
        Meetup {
          data {
            Date
            Video_link
            Title
            Slug
          }
        }
        Theses
      }
    }
  }
`

export default TalkPage
