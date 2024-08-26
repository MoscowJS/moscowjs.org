import React, { FunctionComponent } from "react"
import { ConfigData } from "../models/config.h"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet, HelmetProps } from "react-helmet"

const SEO: FunctionComponent<{
  description?: string
  lang?: string
  meta?: HelmetProps["meta"]
  title?: string
}> = ({ description = "", lang = "ru", meta = [], title }) => {
  const {
    allAirtableconfig: { nodes },
  } = useStaticQuery<{
    allAirtableconfig: {
      nodes: Array<{
        data: ConfigData
      }>
    }
  }>(
    graphql`
      query {
        allAirtableconfig(filter: { data: { type: { eq: "meta" } } }) {
          nodes {
            data {
              name
              value
            }
          }
        }
      }
    `
  )

  const site: {
    description?: string
    title?: string
    author?: string
  } = nodes.reduce((result, { data }) => {
    result[data.name] = data.value
    return result
  }, {} as any)

  const metaDescription = description || site.description
  const defaultTitle = site.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `${defaultTitle} — %s` : undefined}
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
