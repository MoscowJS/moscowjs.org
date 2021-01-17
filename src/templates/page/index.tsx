import React, { FunctionComponent } from "react"
import SEO from "utils/seo"
import { Container, Footer, Header, Markdown } from "components/layout"
import { graphql, PageProps } from "gatsby"
import { PagesData } from "models"

const Page: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
  }>
> = ({ data, location }) => {
  return (
    <>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>
      </Container>
      <Footer />
    </>
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

export default Page
