import React, { FunctionComponent } from 'react'
import { graphql, Link, PageProps, useStaticQuery } from 'gatsby'

// import SEO from 'utils/seo'
import { Container, Hero, Panel, Header } from 'components/layout'
import { Event } from 'features/events/event'
import { Meetup, WrappedWithDirectus } from 'models'
import { EventsFeed } from 'features/events/eventsFeed'

type GraphqlDirectusMeetupsCount = {
  count: {
    id: number
  }
}

const IndexPage: FunctionComponent<PageProps> = ({ location }) => {
  const result = useStaticQuery<
    WrappedWithDirectus<{
      meetups: Array<Meetup>
      meetups_aggregated: Array<GraphqlDirectusMeetupsCount>
    }>
  >(graphql`
    query {
      directus {
        meetups_aggregated(filter: { publish: { _eq: true } }) {
          count {
            id
          }
        }
        meetups(
          filter: { publish: { _eq: true } }
          sort: ["-date_start"]
          limit: 6
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
  `)

  const [latestEvent, ...otherEvents] = result.directus.meetups
  const totalCount = result.directus.meetups_aggregated.at(0)?.count.id ?? 0

  return (
    <>
      {/* <SEO title="Главная" /> */}
      <Hero image={void 0} height="800px">
        <Header location={location} />
        <Hero.Container verticalAlign="center">
          <Event event={latestEvent} isIndexPage={true} short={true} />
        </Hero.Container>
      </Hero>

      <Container as="main">
        <Panel>
          <h3>Для докладчиков</h3>
          <p>
            Мы всегда рады новым докладам. Чтобы стать докладчиком на нашем
            митапе, нужно заполнить специальную форму. Подать заявку и
            ознакомиться с информацией для спикеров можно{' '}
            <Link to="/cfp/">тут</Link>.
          </p>
        </Panel>

        <h3>Предыдущие мероприятия</h3>

        <EventsFeed events={otherEvents} />

        <p>
          <Link to={'/events/'}>Все мероприятия ({totalCount})</Link>
        </p>
      </Container>
      {/* <Footer /> */}
    </>
  )
}

export default IndexPage
