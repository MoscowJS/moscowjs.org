import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Layout } from "../components/layout/layout"
import { Markdown } from "../components/markdown/markdown"
import { PagesData } from "../models/pages.h"
import { SpeakerData } from "../models/speaker.h"
import { SpeakersGrid } from "../components/speakersGrid/speakersGrid"
import { graphql, PageProps } from "gatsby"

const SpeakersPage: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
    allAirtablespeakers: {
      totalCount: number
      nodes: Array<{
        data: SpeakerData
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
        <SpeakersGrid speakers={data.allAirtablespeakers.nodes} />
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
    allAirtablespeakers(
      sort: { fields: data___Talks___data___Date, order: DESC }
    ) {
      nodes {
        id
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
      totalCount
    }
  }
`

export default SpeakersPage
