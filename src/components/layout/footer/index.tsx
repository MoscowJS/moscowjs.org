import React from 'react'
import { Twitter, Youtube } from 'react-feather'
import styled from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'

import type { Navigation as NavigationType, WrappedWithDirectus } from 'models'
import { Container } from 'components/layout'
import { pagePath } from 'utils/paths'
import { rhythm } from 'utils/typography'
import { Telegram } from '../../icons/telegram'

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

const Navigation = styled.nav`
  font-size: small;
`

export const Footer = () => {
  const {
    directus: { navigation },
  } = useStaticQuery<
    WrappedWithDirectus<{ navigation: Array<NavigationType> }>
  >(graphql`
    query {
      directus {
        navigation(
          filter: {
            status: { _eq: "published" }
            navigation: { _eq: "footer-left" }
          }
          sort: ["order"]
        ) {
          id
          customUrl
          slug
          title
        }
      }
    }
  `)

  const navigations = navigation.map(nav => ({
    external: !!nav.customUrl,
    url: nav.customUrl || pagePath(nav.slug[0]),
    title: nav.title,
  }))

  return (
    <FooterContainer as="footer">
      <Column>
        <div>© 2011 — {new Date().getFullYear()}, MoscowJS Team</div>
        <Navigation>
          {navigations.map(({ external, url, title }) => {
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
        </Navigation>
      </Column>

      <Column>
        <nav>
          <IconLink href="https://t.me/moscowjs" title="Telegram MoscowJS">
            <Telegram size={rhythm(1)} />
          </IconLink>
          <IconLink
            href="https://www.youtube.com/c/moscowjs"
            title="YouTube MoscowJS"
          >
            <Youtube size={rhythm(1)} />
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
