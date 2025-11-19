import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'

import SEO from '../../utils/seo'
import type { Page, Speaker, WrappedWithDirectus } from '../../models'
import { Container, Footer, Header, Markdown } from '../../components/layout'
import { SpeakersGrid } from '../../features/speakers/speakersGrid'

const SpeakersPage: FunctionComponent<
  PageProps<
    WrappedWithDirectus<{
      pages_by_id: Pick<Page, 'title' | 'content'>
      persons: Array<Pick<Speaker, 'id' | 'name' | 'photo' | 'talks'>>
    }>
  >
> = ({ data, location }) => {
  const {
    persons: speakers,
    pages_by_id: { content, title },
  } = data.directus
  return (
    <>
      <SEO title={title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{content}</Markdown>
        <SpeakersGrid speakers={speakers} />
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query ($id: ID!) {
    directus {
      pages_by_id(id: $id) {
        title
        content
      }
      persons(
        filter: {
          talks: { talks_id: { meetup_id: { publish: { _eq: true } } } }
        }
        sort: ["-talks.talks_id.meetup_id.date_start"]
        limit: -1
      ) {
        id
        name
        talks(filter: { talks_id: { meetup_id: { id: { _nnull: true } } } }) {
          talks_id {
            company
          }
        }
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
      }
    }
  }
`

export default SpeakersPage
