import React, { FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet, HelmetProps } from 'react-helmet'

import type { Config, WrappedWithDirectus } from '../models'

const SEO: FunctionComponent<{
  description?: string
  lang?: string
  meta?: HelmetProps['meta']
  title?: string
}> = ({ description = '', lang = 'ru', meta = [], title }) => {
  const {
    directus: { config },
  } = useStaticQuery<
    WrappedWithDirectus<{
      config: Array<Pick<Config, 'name' | 'value'>>
    }>
  >(
    graphql`
      query {
        directus {
          config {
            name
            value
          }
        }
      }
    `
  )

  const site: {
    description?: string
    title?: string
    author?: string
  } = config.reduce((result, data) => {
    result[data.name] = data.value
    return result
  }, {} as any)

  const metaDescription = description ?? site.description
  const defaultTitle = site.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `${defaultTitle} — %s` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta as any)}
    />
  )
}

export default SEO
