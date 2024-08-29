import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'

// import SEO from "utils/seo"
import type { Talk as TalkType, WrappedWithDirectus } from 'models'
import { Container } from 'components/layout'
import { Talk } from 'features/talks/talk'

type GraphqlDirectusTalks = {
  talks_by_id: TalkType
}

const TalkPage: FunctionComponent<
  PageProps<WrappedWithDirectus<GraphqlDirectusTalks>>
> = ({ data }) => {
  const talk = data.directus.talks_by_id

  return (
    <>
      {/* <SEO title={talk.Title} /> */}
      {/* <Header location={location} /> */}
      <Container as="main">
        <pre>{JSON.stringify(talk, null, 2)}</pre>

        <Talk talk={talk} level={1} />
      </Container>
      {/* <Footer /> */}
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
          id
        }
        meetup_id {
          id
        }
      }
    }
  }
`

export default TalkPage
