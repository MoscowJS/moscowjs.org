import React, { FunctionComponent } from "react"
import SEO from "utils/seo"
import { Container, Footer, Header, Markdown } from "components/layout"
import { graphql, PageProps } from "gatsby"
import { transformConfig } from "utils/transformConfig"
import { ConfigData, PagesData } from "models"

const CFP: FunctionComponent<
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
  const formType = config?.cfpform?.value || "airtable"

  return (
    <>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Container as="main">
        {formType === "airtable" && <iframe
          src="https://airtable.com/embed/appV8iIxl39lc20bh/pag57KTKlKuiOgmvH/form"
          style={{
            width: "100%",
            height: "533px",
            border: "none",
          }}
        />}
        {formType === "typeform" && <iframe
          src="https://form.typeform.com/to/ogjLwQex?typeform-medium=embed-snippet"
          style={{
            width: "100%",
            height: "500px",
            border: "none",
          }}
        />}

        <Markdown>{data.airtablepages.data.content}</Markdown>
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query ($id: String!) {
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

export default CFP
