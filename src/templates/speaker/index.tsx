import Img from "gatsby-image"
import React, { FunctionComponent } from "react"
import SEO from "utils/seo"
import { Container, Footer, Header, Item, Markdown } from "components/layout"
import { EventLogo } from "features/events/eventLogo"
import { graphql, PageProps } from "gatsby"
import { SpeakerData } from "models"
import { Talk } from "features/talks/talk"
import { UserX } from "react-feather"

const transformContacts = (speaker: SpeakerData) => {
  const result = []

  if (speaker.Telegram) {
    result.push({
      title: "telegram",
      href: `https://t.me/${speaker.Telegram}`,
      text: `t.me/${speaker.Telegram}`,
    })
  }

  if (speaker.Email) {
    result.push({
      title: "email",
      href: `mailto:${speaker.Email}`,
      text: speaker.Email,
    })
  }

  if (speaker.Twitter) {
    result.push({
      title: "twitter",
      href: `https://twitter.com/${speaker.Twitter}`,
      text: `@${speaker.Twitter}`,
    })
  }

  if (speaker.Github___Bitbucket) {
    result.push({
      title: "github",
      href: `https://github.com/${speaker.Github___Bitbucket}`,
      text: `@${speaker.Github___Bitbucket}`,
    })
  }

  if (speaker.Personal_link) {
    result.push({
      title: "personal",
      href: speaker.Personal_link,
      text: speaker.Personal_link,
    })
  }

  return result
}

const SpeakerPage: FunctionComponent<
  PageProps<{
    airtablespeakers: { data: SpeakerData }
  }>
> = ({ data, location }) => {
  const speaker = data.airtablespeakers.data
  const contacts = transformContacts(speaker)

  return (
    <>
      <SEO title={speaker.Name} />
      <Header location={location} />
      <Container as="main">
        <Item>
          <Item.ImageContainer size="xl">
            {speaker.Photo ? (
              <Img
                fluid={speaker.Photo.localFiles[0].childImageSharp.fluid}
                alt={speaker.Name}
              />
            ) : (
              <UserX size="100%" />
            )}
          </Item.ImageContainer>
          <Item.Content>
            <h1>{speaker.Name}</h1>
            <Markdown>{speaker.About}</Markdown>
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
        {speaker.Talks?.sort((a, b) => {
          return +new Date(b.data.Date) - +new Date(a.data.Date)
        }).map(({ data }) => {
          const meetup = data.Meetup[0].data

          return (
            <Item>
              <Item.ImageContainer size="xs">
                <EventLogo size="xs" title={meetup.Title} />
              </Item.ImageContainer>
              <Item.Content verticalAlign="center">
                <Talk.Description talk={data} level={2} />
              </Item.Content>
            </Item>
          )
        })}
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    airtablespeakers(id: { eq: $id }) {
      data {
        Name
        About
        Company
        Telegram
        Email
        Twitter
        Github___Bitbucket
        Personal_link
        Talks {
          data {
            Date
            Title
            Record
            Slides_URL
            Publish
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
`

export default SpeakerPage
