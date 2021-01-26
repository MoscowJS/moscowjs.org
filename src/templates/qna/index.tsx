import React, { FunctionComponent } from "react"
import { graphql, PageProps } from "gatsby"
import SEO from "utils/seo"
import { Container, Footer, Header, Markdown } from "components/layout"
import { PagesData } from "models"
import { QuestionForm, QuestionsList, useQnaList } from "features/qna"

const Page: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
  }>
> = ({ data, location }) => {
  const [list, loading, actions] = useQnaList()

  return (
    <>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>
        <QuestionForm onSubmit={actions.add} />
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <QuestionsList upvote={actions.upvote} questions={list} />
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
  }
`

export default Page
