import React from "react"
import styled from "styled-components"
import { NavigationData } from "../../../models/navigation.h"
import { pagePath } from "../../../utils/paths"
import { rhythm } from "../../../utils/typography"
import { Telegram } from "../../icons/telegram"
import { Container } from "components/layout"
import { Facebook, Instagram, Twitter, Youtube } from "react-feather"
import { graphql, Link, useStaticQuery } from "gatsby"

const FooterContainer = styled(Container)`
  @media (min-width: 768px) {
    display: flex;
  }
`

const Column = styled.div`
  flex: 1 1 auto;
  margin-bottom: ${rhythm(1)};

  @media (min-width: 768px) {
    &:nth-child(2) {
      text-align: right;
    }
  }
`

const IconLink = styled.a`
  display: inline-block;
  margin-right: ${rhythm(1)};

  &:last-child {
    margin-right: 0;
  }
`

export const Footer = () => {
  const {
    allAirtablenavigation: { nodes },
  } = useStaticQuery<{
    allAirtablenavigation: {
      nodes: Array<{
        data: NavigationData
      }>
    }
  }>(graphql`
    {
      allAirtablenavigation(
        filter: {
          data: { navigation: { eq: "footer-left" }, show: { eq: true } }
        }
        sort: { fields: data___order, order: ASC }
      ) {
        nodes {
          data {
            customUrl
            slug
            title
          }
        }
      }
    }
  `)

  const navigation = nodes.map(({ data }) => ({
    external: !!data.customUrl,
    url: data.customUrl || pagePath(data.slug[0]),
    title: data.title,
  }))

  return (
    <FooterContainer as="footer">
      <Column>
        <div>© 2011 — {new Date().getFullYear()}, MoscowJS Team</div>
        <nav>
          {navigation.map(({ external, url, title }) => {
            return (
              <div key={url}>
                {external ? (
                  <a href={url}>{title}</a>
                ) : (
                  <Link to={url}>{title}</Link>
                )}
              </div>
            )
          })}
        </nav>
      </Column>

      <Column>
        <nav>
          <IconLink href="https://t.me/moscowjs" title="Telegram MoscowJS">
            <Telegram size={rhythm(1)} />
          </IconLink>
          <IconLink
            href="https://www.instagram.com/moscowjsmeetup/"
            title="Instagram MoscowJS"
          >
            <Instagram size={rhythm(1)} />
          </IconLink>
          <IconLink
            href="https://www.youtube.com/c/moscowjs"
            title="YouTube MoscowJS"
          >
            <Youtube size={rhythm(1)} />
          </IconLink>
          <IconLink
            href="https://www.facebook.com/groups/moscowjs/"
            title="Facebook MoscowJS"
          >
            <Facebook size={rhythm(1)} />
          </IconLink>
          <IconLink
            href="https://twitter.com/moscowjs"
            title="Twitter MoscowJS"
          >
            <Twitter size={rhythm(1)} />
          </IconLink>
        </nav>
        <p>
          <a href="mailto:team@moscowjs.org">team@moscowjs.org</a>
        </p>
      </Column>
    </FooterContainer>
  )
}
