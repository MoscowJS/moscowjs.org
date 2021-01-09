import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Layout } from "../components/layout/layout"
import { Talk } from "../components/talk/talk"
import { TalkData } from "../models/talk.h"
import { graphql, PageProps } from "gatsby"

const TalkPage: FunctionComponent<
  PageProps<{
    airtabletalks: { data: TalkData }
  }>
> = ({ data, location }) => {
  const talk = data.airtabletalks.data

  return (
    <Layout>
      <SEO title={talk.Title} />
      <Header location={location} />
      <Layout.Container as="main">
        <Talk talk={talk} level={1} />
      </Layout.Container>
      <Footer />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
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
            Date(locale: "ru", formatString: "LLL")
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
