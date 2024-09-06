import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'

// import SEO from "utils/seo"
import type { Page, Meetup, WrappedWithDirectus } from 'models'
import { Container, Footer, Header, Markdown } from 'components/layout'
import { EventsFeed } from 'features/events/eventsFeed'

const EventsPage: FunctionComponent<
  PageProps<
    WrappedWithDirectus<{
      pages_by_id: Pick<Page, 'title' | 'content'>
      meetups: Array<Meetup>
    }>
  >
> = ({ data, location }) => {
  const { pages_by_id: page, meetups } = data.directus

  return (
    <>
      {/* <SEO title={page.title} /> */}
      <Header location={location} />
      <Container as="main">
        <Markdown>{page.content}</Markdown>
        <EventsFeed events={meetups} />
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query ($id: ID!) {
    directus {
      pages_by_id(id: $id) {
        title
        content
      }
      meetups(
        filter: { publish: { _eq: true } }
        sort: ["-date_start"]
        limit: -1
      ) {
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
        slug
        stream_link
        video_link
        talks {
          id
          company
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

export default EventsPage
