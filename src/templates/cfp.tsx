import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Layout } from "../uikit"
import { Markdown } from "../components/markdown/markdown"
import { PagesData } from "../models/pages.h"
import { graphql, PageProps } from "gatsby"

const MeetupPage: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
  }>
> = ({ data, location }) => {
  return (
    <Layout>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Layout.Container as="main">
        <iframe
          src="https://form.typeform.com/to/ogjLwQex?typeform-medium=embed-snippet"
          css="width: 100%; height: 500px; border: none;"
        />
        <Markdown>{data.airtablepages.data.content}</Markdown>
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
  }
`

export default MeetupPage
