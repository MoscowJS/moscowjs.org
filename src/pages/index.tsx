import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Event } from "../components/event/event"
import { EventData } from "../models/event.h"
import { Feed } from "../components/feed/feed"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Hero } from "../components/hero/hero"
import { ImageSharp } from "../models/gatsby.h"
import { Layout } from "../components/layout/layout"
import { FluidObject } from "gatsby-image"
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

  console.log(result)

  const {
    allAirtablemeetups: { totalCount, nodes },
    hero,
  } = result

  const [latestEvent, ...otherEvents] = nodes

  return (
    <Layout>
      <SEO title="Главная" />
      <Hero image={hero.childImageSharp.fluid} height="800px">
        <Header location={location} />
        <Hero.Container verticalAlign="center">
          <Event event={latestEvent.data} isIndexPage={true} short={true} />
        </Hero.Container>
      </Hero>

      <Layout.Container as="main">
        <h3>Для докладчиков</h3>
        <p>
          Мы всегда рады новым докладам. Чтобы стать докладчиком на нашем
          митапе, нужно заполнить специальную форму. Подать заявку и
          ознакомиться с информацией для спикеров можно{" "}
          <Link to="/cfp/">тут</Link>.
        </p>

        <h3>Предыдущие мероприятия</h3>

        <Feed events={otherEvents} />

        <p>
          <Link to={"/events/"}>Все мероприятия ({totalCount})</Link>
        </p>
      </Layout.Container>
      <Footer />
    </Layout>
  )
}

export default IndexPage
