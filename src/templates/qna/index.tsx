import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'

// import SEO from "utils/seo"
import type { Page as PageType, WrappedWithDirectus } from '../../models'
import { Container, Footer, Header, Markdown } from '../../components/layout'

const Page: FunctionComponent<
  PageProps<
    WrappedWithDirectus<{
      pages_by_id: Pick<PageType, 'title' | 'content'>
    }>
  >
> = ({ data, location }) => {
  const { pages_by_id: page } = data.directus
  // const config = transformConfig(data.allAirtableconfig.nodes)

  return (
    <>
      {/* <SEO title={page.title} /> */}
      <Header location={location} />
      <Container as="main">
        <Markdown>{page.content}</Markdown>
        {/* {typeof window !== 'undefined' && (
          <SessionContext.Provider value={config.session.value}>
            <Suspense fallback={<p>Загрузка...</p>}>
              <QnaAsyncContainer />
            </Suspense>
          </SessionContext.Provider>
        )} */}
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
        content
      }
    }
  }
`

export default Page
