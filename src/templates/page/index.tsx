import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'

// import SEO from "utils/seo"
import type { Page as PageType, WrappedWithDirectus } from '../../models'
import { Container, Footer, Header, Markdown } from '../../components/layout'

const Page: FunctionComponent<
  PageProps<WrappedWithDirectus<{ pages_by_id: PageType }>>
> = ({ data, location }) => {
  const page = data.directus.pages_by_id
  return (
    <>
      {/* <SEO title={page.title} /> */}
      <Header location={location} />
      <Container as="main">
        <Markdown>{page.content}</Markdown>
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
        slug
        content
      }
    }
  }
`

export default Page
