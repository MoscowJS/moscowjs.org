import React, { FunctionComponent, Suspense } from "react"
import { graphql, PageProps } from "gatsby"
import SEO from "utils/seo"
import { Container, Footer, Header, Markdown } from "components/layout"
import { PagesData } from "models"

const QnaAsyncContainer = React.lazy(() => import('../../features/qna/qnaAsyncContainer'))

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
        {typeof window !== "undefined" && <Suspense fallback={<p>Загрузка...</p>}>
          <QnaAsyncContainer />
        </Suspense>}
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
