import React, { FunctionComponent, Suspense } from "react"
import { graphql, PageProps } from "gatsby"
import SEO from "utils/seo"
import { Container, Footer, Header, Markdown } from "components/layout"
import { ConfigData, PagesData } from "models"
import { transformConfig } from "utils/transformConfig"
import { SessionContext } from "features/qna"

const QnaAsyncContainer = React.lazy(
  () => import("../../features/qna/qnaAsyncContainer")
)

const Page: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
    allAirtableconfig: {
      nodes: Array<{
        data: ConfigData
      }>
    }
  }>
> = ({ data, location }) => {
  const config = transformConfig(data.allAirtableconfig.nodes)


  return (
    <>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>
        {typeof window !== "undefined" && (
          <SessionContext.Provider value={config.session.value}>
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
  query($id: String!) {
    airtablepages(id: { eq: $id }) {
      data {
        title
        slug
        content
        description
      }
    }
    allAirtableconfig(filter: { data: { type: { eq: "qna" } } }) {
      nodes {
        data {
          name
          value
        }
      }
    }
  }
`

export default Page
