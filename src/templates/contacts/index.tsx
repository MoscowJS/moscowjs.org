import Img from "gatsby-image"
import React, { FunctionComponent } from "react"
import SEO from "utils/seo"
import { Container, Footer, Header, Item, Markdown } from "components/layout"
import { graphql, PageProps } from "gatsby"
import { OrgData, PagesData } from "models"
import { UserX } from "react-feather"
import styled from "styled-components"
import { rhythm } from "utils/typography"

const Grid = styled.ul`
  --item-width: ${rhythm(4)};

  margin: 0 0 ${rhythm(2)};
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--item-width));
  grid-gap: ${rhythm(0.5)};
  justify-content: space-between;
`

const GridItem = styled.li`
  display: inline-block;
  overflow: hidden;
  text-align: center;
  font-size: ${rhythm(0.5)};
  margin: 0;
`

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
  const orgs = data.allAirtableorgs.nodes.reduce(
    (result, { data }) => {
      result[data.Status].push(data)
      return result
    },
    {
      current: [] as OrgData[],
      former: [] as OrgData[],
      volunteer: [] as OrgData[],
    }
  )

  return (
    <>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>

        <h3>Организаторы</h3>
        {orgs.current.map(data => {
          return (
            <Item key={data.Display_name}>
              <Item.ImageContainer size="xs">
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
                <div>
                  telegram:{" "}
                  <a href={`https://t.me/${data.Telegram[0]}`}>
                    t.me/{data.Telegram[0]}
                  </a>
                </div>
                <div>
                  email: <a href={`mailto:${data.Email}`}>{data.Email}</a>
                </div>
              </Item.Content>
            </Item>
          )
        })}

        <h3>Бывшие организаторы (спасибо!)</h3>
        <Grid>
          {orgs.former.map(data => (
            <GridItem key={data.Display_name}>
              <div>
                {data.Photo ? (
                  <Img
                    fluid={data.Photo.localFiles[0].childImageSharp.fluid}
                    alt={data.Display_name}
                  />
                ) : (
                  <div
                    css={`
                      line-height: 0;
                    `}
                  >
                    <UserX size="100%" />
                  </div>
                )}
                <p
                  css={`
                    text-align: center;
                    font-size: ${rhythm(0.4)};
                  `}
                >
                  {data.Display_name}
                </p>
              </div>
            </GridItem>
          ))}
        </Grid>

        <h3>Волонтеры</h3>
        <ul>
          {orgs.volunteer.map(data => (
            <li>{data.Display_name}</li>
          ))}
        </ul>
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
    allAirtableorgs(sort: { fields: data___Display_name, order: ASC }) {
      nodes {
        data {
          Display_name
          About
          Email
          Telegram
          Status
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
