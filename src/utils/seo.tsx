import React, { FunctionComponent } from "react"
import PropTypes from "prop-types"
import { Helmet, HelmetProps } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO: FunctionComponent<{
  description?: string
  lang?: string
  meta?: HelmetProps["meta"]
  title?: string
}> = ({ description = "", lang = "ru", meta = [], title }) => {
  const {
    allAirtablemeta: { edges },
  } = useStaticQuery<{
    allAirtablemeta: {
      edges: Array<{
        node: {
          data: {
            name: string
            value: string
          }
        }
      }>
    }
  }>(
    graphql`
      query {
        allAirtablemeta {
          edges {
            node {
              data {
                name
                value
              }
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
  } = edges.reduce((result, { node }) => {
    result[node.data.name] = node.data.value
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
