import React, { FunctionComponent } from "react"
import SEO from "utils/seo"
import { Container, Footer, Header } from "components/layout"
import { Event } from "features/events/event"
import { EventData } from "models"
import { graphql, PageProps } from "gatsby"

const MeetupPage: FunctionComponent<
  PageProps<{
    airtablemeetups: { data: EventData }
  }>
> = ({ data, location }) => {
  return (
    <>
      <SEO title={data.airtablemeetups.data.Title} />
      <Header location={location} />
      <Container as="main">
        <Event event={data.airtablemeetups.data} />
      </Container>
      <Footer />
    </>
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
            Date
            Meetup {
              data {
                Date(locale: "ru", formatString: "LLL")
                Video_link
                Title
                Slug
              }
            }
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
