import React, { FunctionComponent } from "react"
import SEO from "utils/seo"
import { Container, Footer, Header, Markdown } from "components/layout"
import { graphql, PageProps } from "gatsby"
import { PagesData, SpeakerData } from "models"
import { SpeakersGrid } from "features/speakers/speakersGrid"

const SpeakersPage: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
    allAirtablespeakers: {
      totalCount: number
      nodes: Array<{
        data: SpeakerData
      }>
    }
  }>
> = ({ data, location }) => {
  return (
    <>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>
        <SpeakersGrid speakers={data.allAirtablespeakers.nodes} />
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
    allAirtablespeakers(
      sort: { fields: data___Talks___data___Date, order: DESC }
    ) {
      nodes {
        id
        data {
          Name
          Company
          Photo {
            localFiles {
              childImageSharp {
                fluid(
                  cropFocus: CENTER
                  quality: 80
                  grayscale: true
                  maxWidth: 150
                  maxHeight: 150
                  fit: COVER
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      totalCount
    }
  }
`

export default SpeakersPage
