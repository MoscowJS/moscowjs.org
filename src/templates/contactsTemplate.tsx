import Img from "gatsby-image"
import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Item } from "../components/item/item"
import { Layout } from "../components/layout/layout"
import { Markdown } from "../components/markdown/markdown"
import { OrgData } from "../models/org.h"
import { PagesData } from "../models/pages.h"
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
                {data.Photo ? (
                  <Img
                    fluid={data.Photo.localFiles[0].childImageSharp.fluid}
                    alt={data.Display_name}
                  />
                ) : (
                  <UserX size="100%" />
                )}
              </Item.ImageContainer>
              <Item.Content>
                <Item.Header>{data.Display_name}</Item.Header>
                <Markdown>{data.About?.[0]}</Markdown>
                <ul
                  css={`
                    list-style-type: none;

                    li {
                      margin: 0;
                    }
                  `}
                >
                  <li>
                    telegram:{" "}
                    <a href={`https://t.me/${data.Telegram[0]}`}>
                      t.me/{data.Telegram[0]}
                    </a>
                  </li>

                  <li>
                    email:{" "}
                    <a href={`mailto:${data.Email}`}>{data.Email}</a>
                  </li>
                </ul>
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
          About
          Email
          Telegram
          Company
          Photo {
            localFiles {
              childImageSharp {
                fluid(
                  cropFocus: CENTER
                  quality: 80
                  grayscale: true
                  maxWidth: 300
                  maxHeight: 300
                  fit: COVER
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Page
