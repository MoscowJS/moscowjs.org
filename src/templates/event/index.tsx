import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'

import type { Meetup, WrappedWithDirectus } from '../../models'
import { Container, Footer, Header } from '../../components/layout'
import { Event } from '../../features/events/event'
import SEO from '../../utils/seo'

type GraphqlDirectusMeetup = {
  meetups_by_id: Meetup
}

const MeetupPage: FunctionComponent<
  PageProps<WrappedWithDirectus<GraphqlDirectusMeetup>>
> = ({ data, location }) => {
  const { meetups_by_id: meetup } = data.directus
  return (
    <>
      <SEO title={meetup.title} />
      <Header location={location} />
      <Container as="main">
        <Event event={meetup} />
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query ($id: ID!) {
    directus {
      meetups_by_id(id: $id) {
        id
        title
        type
        address
        status
        date_start
        date_end
        title_formatted
        registration_link
        announcement_short
        announcement_long
        timetable
        slug
        stream_link
        video_link
        talks {
          id
          title
          theses
          company
          scene
          start_time
          speakers {
            persons_id {
              name
              talks {
                talks_id {
                  id
                  title
                }
              }
              photo {
                id
                imageFile {
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
        venue_id {
          id
          name
          slug
        }
        companies {
          companies_id {
            id
            name
            slug
          }
        }
        partners {
          partners_id {
            id
            name
            link
            description
          }
        }
      }
    }
  }
`

export default MeetupPage
