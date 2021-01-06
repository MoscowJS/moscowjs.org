import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Event } from "../components/event/event"
import { EventData } from "../models/event.h"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Layout } from "../uikit/layout/layout"
import { graphql, PageProps } from "gatsby"

const SpeakerPage: FunctionComponent<
  PageProps<{
    airtablemeetups: { data: EventData }
  }>
> = ({ data, location }) => {
  return (
    <Layout>
      {/* <SEO title={data.airtablemeetups.data.Title} /> */}
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
    airtablespeakers(id: { eq: $id }) {
      data {
        Name
      }
    }
  }
`

export default SpeakerPage
