import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'
import Img from 'gatsby-image'
import { UserX } from 'react-feather'

import type { WrappedWithDirectus, Speaker } from 'models'
// import SEO from "utils/seo"
import {
  Container,
  // Footer,
  // Header,
  Item,
  Markdown,
} from 'components/layout'
import { EventLogo } from 'features/events/eventLogo'
import { Talk } from 'features/talks/talk'

const transformContacts = (speaker: Speaker) => {
  const result = []

  if (speaker.telegram) {
    result.push({
      title: 'telegram',
      href: `https://t.me/${speaker.telegram}`,
      text: `t.me/${speaker.telegram}`,
    })
  }

  if (speaker.email) {
    result.push({
      title: 'email',
      href: `mailto:${speaker.email}`,
      text: speaker.email,
    })
  }

  if (speaker.github) {
    result.push({
      title: 'github',
      href: `https://github.com/${speaker.github}`,
      text: `@${speaker.github}`,
    })
  }

  if (speaker.link) {
    result.push({
      title: 'personal',
      href: speaker.link,
      text: speaker.link,
    })
  }

  return result
}

type GraphqlDirectusTalks = {
  persons_by_id: Speaker
}

const SpeakerPage: FunctionComponent<
  PageProps<WrappedWithDirectus<GraphqlDirectusTalks>>
> = ({ data }) => {
  const speaker = data.directus.persons_by_id
  const contacts = transformContacts(speaker)

  const talks = (speaker.talks ?? [])
    .filter(talk => Boolean(talk.talks_id.meetup_id))
    .sort((talkA, talkB) => {
      return (
        new Date(talkB.talks_id.meetup_id!.date_start).valueOf() -
        new Date(talkA.talks_id.meetup_id!.date_start).valueOf()
      )
    })

  return (
    <>
      {/* <SEO title={speaker.Name} /> */}
      {/* <Header location={location} /> */}
      <Container as="main">
        <pre>{JSON.stringify(speaker, null, 2)}</pre>
        <Item>
          <Item.ImageContainer size="xl">
            {speaker.photo ? (
              <Img
                fluid={speaker.photo.imageFile.childImageSharp.fluid}
                alt={speaker.name}
              />
            ) : (
              <UserX size="100%" />
            )}
          </Item.ImageContainer>
          <Item.Content>
            <h1>{speaker.name}</h1>
            <Markdown>{speaker.about}</Markdown>
            {contacts.length > 0 && (
              <>
                {contacts.map(({ title, href, text }) => {
                  return (
                    <div key={title}>
                      {title}: <a href={href}>{text}</a>
                    </div>
                  )
                })}
              </>
            )}
          </Item.Content>
        </Item>
        <h2>Доклады</h2>
        {talks.map(meetupData => {
          const talk = meetupData['talks_id']

          return (
            <Item>
              <Item.ImageContainer size="xs">
                <EventLogo size="xs" title={talk.title} />
              </Item.ImageContainer>
              <Item.Content verticalAlign="center">
                <Talk.Description talk={talk} level={2} />
              </Item.Content>
            </Item>
          )
        })}
      </Container>
      {/* <Footer /> */}
    </>
  )
}

export const query = graphql`
  query ($id: ID!) {
    directus {
      persons_by_id(id: $id) {
        id
        status
        telegram
        name
        role
        phone
        email
        about
        github
        link
        photo {
          id
          imageFile {
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
        talks {
          talks_id {
            id
            title
            theses
            meetup_id {
              id
              date_start
            }
          }
        }
      }
    }
  }
`

export default SpeakerPage
