import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Event } from "../components/event/event"
import { EventData } from "../models/event.h"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Layout } from "../components/layout/layout"
import { graphql, PageProps } from "gatsby"

const MeetupPage: FunctionComponent<
  PageProps<{
    airtablemeetups: { data: EventData }
  }>
> = ({ data, location }) => {
  return (
    <Layout>
      <SEO title={data.airtablemeetups.data.Title} />
      <Header location={location} />
      <Layout.Container as="main">
        <Event event={data.airtablemeetups.data} />
      </Layout.Container>
      <Footer />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    airtablemeetups(id: { eq: $id }) {
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
                        maxWidth: 150
                        maxHeight: 150
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
`

export default MeetupPage
