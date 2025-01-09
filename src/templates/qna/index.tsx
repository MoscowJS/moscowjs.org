import React, { FunctionComponent, Suspense } from 'react'
import { graphql, PageProps } from 'gatsby'

import SEO from '../../utils/seo'
import { transformConfig } from '../../utils/transformConfig'
import type {
  Config,
  Page as PageType,
  WrappedWithDirectus,
} from '../../models'
import { Container, Footer, Header, Markdown } from '../../components/layout'
import { SessionContext } from '../../features/qna'

const QnaAsyncContainer = React.lazy(
  () => import('../../features/qna/qnaAsyncContainer')
)

const Page: FunctionComponent<
  PageProps<
    WrappedWithDirectus<{
      config: Array<Pick<Config, 'name' | 'value'>>
      pages_by_id: Pick<PageType, 'title' | 'content'>
    }>
  >
> = ({ data, location }) => {
  const { pages_by_id: page, config } = data.directus
  const transformedConfig = transformConfig(config)

  return (
    <>
      <SEO title={page.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{page.content}</Markdown>
        {typeof window !== 'undefined' && (
          <SessionContext.Provider value={transformedConfig?.session?.value}>
            <Suspense fallback={<p>Загрузка...</p>}>
              <QnaAsyncContainer />
            </Suspense>
          </SessionContext.Provider>
        )}
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query ($id: ID!) {
    directus {
      config(filter: { type: { _eq: "qna" } }) {
        name
        value
      }
      pages_by_id(id: $id) {
        title
        content
      }
    }
  }
`

export default Page
