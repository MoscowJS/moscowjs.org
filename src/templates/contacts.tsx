import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Item, Layout } from "../uikit"
import { Markdown } from "../components/markdown/markdown"
import { OrgData } from "../models/org.h"
import { PagesData } from "../models/pages.h"
import { rhythm } from "../utils/typography"
import { SquarePhoto } from "../components/event/squarePhoto"
import { graphql, PageProps } from "gatsby"
import { UserX } from "react-feather"

const Page: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
    allAirtableorgs: {
      nodes: Array<{
        data: OrgData
      }>
    }
  }>
> = ({ data, location }) => {
  return (
    <Layout>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Layout.Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>

        <h3>Организаторы</h3>
        {data.allAirtableorgs.nodes.map(({ data }) => {
          return (
            <Item key={data.Display_name}>
              <Item.ImageContainer size="small">
                <SquarePhoto>
                  {data.Photo ? (
                    <img
                      src={data.Photo[0].thumbnails.large.url}
                      alt={data.Display_name}
                    />
                  ) : (
                    <UserX size="100%" />
                  )}
                </SquarePhoto>
              </Item.ImageContainer>
              <Item.Content>
                <Item.Header>{data.Display_name}</Item.Header>
                <div
                  css={`
                    margin-bottom: ${rhythm(0.5)};
                  `}
                >
                  {data.About?.[0]}
                </div>
                <div>
                  telegram:{" "}
                  <a href={`https://t.me/${data.Telegram[0]}`}>
                    t.me/{data.Telegram[0]}
                  </a>
                  <br />
                  email: <a href={`mailto:${data.Email[0]}`}>{data.Email[0]}</a>
                </div>
              </Item.Content>
            </Item>
          )
        })}
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
    allAirtableorgs(sort: { fields: data___Display_name, order: ASC }) {
      nodes {
        data {
          Display_name
          Email
          Company
          Telegram
          About
          Photo {
            thumbnails {
              large {
                url
              }
            }
          }
        }
      }
    }
  }
`

export default Page
