import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import styled from "styled-components"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Layout } from "../uikit"
import { Markdown } from "../components/markdown/markdown"
import { PagesData } from "../models/pages.h"
import { rhythm } from "../utils/typography"
import { SpeakerData } from "../models/speaker.h"
import { speakerPath } from "../utils/paths"
import { graphql, Link, PageProps } from "gatsby"
import { UserX } from "react-feather"

const SpeakersContainer = styled.ul`
  --item-width: ${rhythm(5)};

  margin: 0 0 ${rhythm(2)};
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--item-width));
  grid-gap: ${rhythm(1)};
  justify-content: space-between;
`

const Speaker = styled.li`
  display: inline-block;
  overflow: hidden;
  text-align: center;
  font-size: ${rhythm(0.5)};
  margin: 0;

  img,
  svg {
    width: var(--item-width);
    height: var(--item-width);
    object-fit: cover;
    margin: 0;
    filter: grayscale(1);
  }
`

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
    <Layout>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Layout.Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>
        <SpeakersContainer>
          {data.allAirtablespeakers.nodes.map(({ data }) => {
            return (
              <Speaker key={data.Name}>
                {data.Photo ? (
                  <img
                    src={data.Photo[0].thumbnails.large.url}
                    alt={data.Name}
                  />
                ) : (
                  <UserX
                    size="100%"
                    css={`
                      color: var(--text-color);
                    `}
                  />
                )}
                <div>
                  <Link to={speakerPath(data.Name)}>{data.Name}</Link>
                  {data.Company && (
                    <>
                      <br />
                      <em>{data.Company}</em>
                    </>
                  )}
                </div>
              </Speaker>
            )
          })}
        </SpeakersContainer>
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
    allAirtablespeakers(
      sort: { fields: data___Talks___data___Date, order: DESC }
    ) {
      nodes {
        id
        data {
          Name
          Company
          Photo {
            thumbnails {
              large {
                url
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
