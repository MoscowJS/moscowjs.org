import meetup from "./meetup"
import React, { FunctionComponent } from "react"
import SEO from "../utils/seo"
import styled from "styled-components"
import { EventLogo } from "../components/eventLogo/eventLogo"
import { eventPath, talkPath } from "../utils/paths"
import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"
import { Item } from "../components/item/item"
import { Layout } from "../components/layout/layout"
import { Markdown } from "../components/markdown/markdown"
import { rhythm } from "../utils/typography"
import { SpeakerPhoto } from "../components/speakerPhoto/speakerPhoto"
import { SpeakersGrid } from "../components/speakersGrid/speakersGrid"
import { TalkData } from "../models/talk.h"
import { graphql, Link, PageProps } from "gatsby"

const Meta = styled.a`
  display: inline-block;
  margin-right: ${rhythm(0.5)};
`

const TalkPage: FunctionComponent<
  PageProps<{
    airtabletalks: { data: TalkData }
  }>
> = ({ data, location }) => {
  const talk = data.airtabletalks.data
  const meetup = talk.Meetup[0].data
  const speakers = talk.Speakers

  return (
    <Layout>
      <SEO title={talk.Title} />
      <Header location={location} />
      <Layout.Container as="main">
        {speakers.length > 1 ? (
          <>
            <Item.Meta>
              <Link to={eventPath(meetup.Slug)}>{meetup.Title}</Link>,{" "}
              <time dateTime={meetup.Date}>
                {new Date(talk.Date).toLocaleDateString()}
              </time>
            </Item.Meta>
            <h1>
              <Link to={talkPath(talk.Title)}>{talk.Title}</Link>
            </h1>

            <Markdown>{talk.Theses}</Markdown>
            {/* {talk.Slides_URL && (
              <TalkMeta Icon={Archive} title="Слайды">
              
              </TalkMeta>
            )} */}
            <h3>Спикеры</h3>

            <SpeakersGrid speakers={speakers} />
          </>
        ) : (
          <Item key={talk.Title}>
            <Item.ImageContainer size="small">
              <SpeakerPhoto speaker={talk.Speakers[0].data} />
            </Item.ImageContainer>
            <Item.Content>
              <Item.Meta>
                <Link to={eventPath(meetup.Slug)}>{meetup.Title}</Link>,{" "}
                <time dateTime={meetup.Date}>
                  {new Date(talk.Date).toLocaleDateString()}
                </time>
              </Item.Meta>
              <Item.Header as="h1">
                <Link to={talkPath(talk.Title)}>{talk.Title}</Link>
              </Item.Header>
              <Markdown>{talk.Theses}</Markdown>
              {talk.Slides_URL && <Meta href={talk.Slides_URL}>Слайды</Meta>}
              {(talk.Record || meetup.Video_link) && (
                <Meta href={talk.Record || meetup.Video_link}>Запись</Meta>
              )}
            </Item.Content>
          </Item>
        )}
      </Layout.Container>
      <Footer />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    airtabletalks(id: { eq: $id }) {
      data {
        Date
        Title
        Record
        Slides_URL
        Publish
        Speakers {
          data {
            Name
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
            Company
          }
        }
        Meetup {
          data {
            Date(locale: "ru", formatString: "LLL")
            Video_link
            Title
            Slug
          }
        }
        Theses
      }
    }
  }
`

export default TalkPage
