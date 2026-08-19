import React, { FunctionComponent, Suspense } from 'react'
import { graphql, PageProps } from 'gatsby'

import SEO from '../../utils/seo'
import { transformConfig } from '../../utils/transformConfig'
import type { Config, WrappedWithDirectus } from '../../models'
import { Container, Footer, Header } from '../../components/layout'
import { SessionContext } from '../../features/qna'
import { allTalks } from '../../features/qna/talks'

const TalkContactsListAsync = React.lazy(
  () => import('../../features/qna/talkContactsList')
)

type PageContext = { index: number }

const Page: FunctionComponent<
  PageProps<
    WrappedWithDirectus<{
      config: Array<Pick<Config, 'name' | 'value'>>
    }>,
    PageContext
  >
> = ({ data, location, pageContext }) => {
  const { config } = data.directus
  const transformedConfig = transformConfig(config)
  const sessionId = transformedConfig?.session?.value
  const talk = allTalks[pageContext.index]

  if (!talk) {
    return (
      <>
        <SEO title="Доклад не найден" />
        <Header location={location} />
        <Container as="main">
          <p>Доклад не найден.</p>
        </Container>
        <Footer />
      </>
    )
  }

  const talkKey = `${talk.title}, ${talk.speaker}`

  return (
    <>
      <SEO title={`Вопросы: ${talk.title}`} />
      <Header location={location} />
      <Container as="main">
        <h2>{talk.title}</h2>
        <p>
          <em>{talk.speaker}</em>
        </p>
        {!sessionId ? (
          <p>В настоящий момент вопросы не принимаются.</p>
        ) : (
          typeof window !== 'undefined' && (
            <SessionContext.Provider value={sessionId}>
              <Suspense fallback={<p>Загрузка...</p>}>
                <TalkContactsListAsync talkKey={talkKey} />
              </Suspense>
            </SessionContext.Provider>
          )
        )}
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query {
    directus {
      config(filter: { type: { _eq: "qna" } }) {
        name
        value
      }
    }
  }
`

export default Page
