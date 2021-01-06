import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Layout } from "../uikit/layout/layout"
import { TalkData } from "../models/talk.h"
import { graphql, PageProps } from "gatsby"

const TalkPage: FunctionComponent<
  PageProps<{
    airtabletalks: { data: TalkData }
  }>
> = ({ data, location }) => {
  return (
    <Layout>
      <SEO title={data.airtabletalks.data.Title} />
      <Header location={location} />
      <Layout.Container as="main">
        {/* <Event event={data.airtablemeetups.data} /> */}
      </Layout.Container>
      <Footer />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    airtabletalks(id: { eq: $id }) {
      data {
        Title
      }
    }
  }
`

export default TalkPage
