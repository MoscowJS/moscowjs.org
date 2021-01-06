import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { EventData } from "../models/event.h"
import { Feed } from "../components/feed/feed"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Layout } from "../uikit"
import { Markdown } from "../components/markdown/markdown"
import { PagesData } from "../models/pages.h"
import { graphql, PageProps, useStaticQuery } from "gatsby"

const MeetupPage: FunctionComponent<
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
    <Layout>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Layout.Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>
        <Feed events={data.allAirtablemeetups.nodes} />
      </Layout.Container>
      <Footer />
    </Layout>
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
                    thumbnails {
                      large {
                        url
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

export default MeetupPage
