import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'

import type {
  Config,
  Page as PageType,
  WrappedWithDirectus,
} from '../../models'
import { Container, Footer, Header, Markdown } from '../../components/layout'
import { transformConfig } from '../../utils/transformConfig'
import CfpForm from '../../features/cfp'
import SEO from '../../utils/seo'

const CFP: FunctionComponent<
  PageProps<
    WrappedWithDirectus<{
      config: Array<Pick<Config, 'name' | 'value'>>
      pages_by_id: Pick<PageType, 'title' | 'content'>
    }>
  >
> = ({ data, location }) => {
  const { pages_by_id: page, config } = data.directus

  const transformedConfig = transformConfig(config)
  const formType = transformedConfig?.cfpform?.value ?? 'directus'

  return (
    <>
      <SEO title={page.title} />
      <Header location={location} />
      <Container as="main">
        {formType === 'directus' && <CfpForm />}
        {formType === 'airtable' && (
          <iframe
            src="https://airtable.com/embed/appV8iIxl39lc20bh/pag57KTKlKuiOgmvH/form"
            style={{
              width: '100%',
              height: '533px',
              border: 'none',
            }}
          />
        )}
        {formType === 'typeform' && (
          <iframe
            src="https://form.typeform.com/to/ogjLwQex?typeform-medium=embed-snippet"
            style={{
              width: '100%',
              height: '500px',
              border: 'none',
            }}
          />
        )}

        <Markdown>{page.content}</Markdown>
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query ($id: ID!) {
    directus {
      config(filter: { type: { _eq: "qna" } }) {
        name
        value
      }
      pages_by_id(id: $id) {
        title
        content
      }
    }
  }
`

export default CFP
