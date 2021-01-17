import React, { FunctionComponent } from "react"
import SEO from "utils/seo"
import { Container, Footer, Header, Hero, Panel } from "components/layout"
import { Event } from "features/events/event"
import { EventData, ImageSharp } from "models"
import { EventsFeed } from "features/events/eventsFeed"
import { graphql, Link, PageProps, useStaticQuery } from "gatsby"

const IndexPage: FunctionComponent<PageProps> = ({ location }) => {
  const result = useStaticQuery<{
    allAirtablemeetups: {
      totalCount: number
      nodes: Array<{
        data: EventData
      }>
    }
    hero: ImageSharp
  }>(graphql`
    {
      hero: file(relativePath: { eq: "main-hero.jpg" }) {
        childImageSharp {
          fluid(grayscale: true, maxWidth: 2560, maxHeight: 800, fit: COVER) {
            base64
            tracedSVG
            srcWebp
            srcSetWebp
            originalImg
            originalName
          }
        }
      }
      allAirtablemeetups(limit: 6, sort: { fields: data___Date, order: DESC }) {
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
            Registration_link
            Short_Announcement
            Slug
            Stream_link
            Title
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
  `)

  const {
    allAirtablemeetups: { totalCount, nodes },
    hero,
  } = result

  const [latestEvent, ...otherEvents] = nodes

  return (
    <>
      <SEO title="Главная" />
      <Hero image={hero.childImageSharp.fluid} height="800px">
        <Header location={location} />
        <Hero.Container verticalAlign="center">
          <Event event={latestEvent.data} isIndexPage={true} short={true} />
        </Hero.Container>
      </Hero>

      <Container as="main">
        <Panel>
          <h3>Для докладчиков</h3>
          <p>
            Мы всегда рады новым докладам. Чтобы стать докладчиком на нашем
            митапе, нужно заполнить специальную форму. Подать заявку и
            ознакомиться с информацией для спикеров можно{" "}
            <Link to="/cfp/">тут</Link>.
          </p>
        </Panel>

        <h3>Предыдущие мероприятия</h3>

        <EventsFeed events={otherEvents} />

        <p>
          <Link to={"/events/"}>Все мероприятия ({totalCount})</Link>
        </p>
      </Container>
      <Footer />
    </>
  )
}

export default IndexPage
