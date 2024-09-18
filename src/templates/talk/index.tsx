import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'

import SEO from '../../utils/seo'
import type {
  Meetup,
  Talk as TalkType,
  WrappedWithDirectus,
} from '../../models'
import { Container, Header, Footer } from '../../components/layout'
import { Talk } from '../../features/talks/talk'

type GraphqlDirectusTalks = {
  talks_by_id: TalkType
}

const TalkPage: FunctionComponent<
  PageProps<WrappedWithDirectus<GraphqlDirectusTalks>>
> = ({ data, location }) => {
  const talk = data.directus.talks_by_id
  const meetup = talk.meetup_id!

  const event: Pick<Meetup, 'id' | 'title' | 'slug' | 'date_start'> = {
    id: meetup.id,
    slug: meetup.slug,
    title: meetup.title,
    date_start: meetup.date_start,
  }

  return (
    <>
      <SEO title={talk.title} />
      <Header location={location} />
      <Container as="main">
        <Talk event={event} talk={talk} level={1} />
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query ($id: ID!) {
    directus {
      talks_by_id(id: $id) {
        id
        status
        title
        slides_url
        record
        type
        theses
        publish
        company
        scene
        speakers {
          persons_id {
            id
            name
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
                company
              }
            }
          }
        }
        meetup_id {
          id
          slug
          title
          date_start
        }
      }
    }
  }
`

export default TalkPage
