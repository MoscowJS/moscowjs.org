import React, { type FunctionComponent } from 'react'
import styled from 'styled-components'
import { graphql, Link, PageProps, useStaticQuery } from 'gatsby'

import type { WrappedWithDirectus, Navigation } from '../../../models'
import { pagePath } from '../../../utils/paths'
import { rhythm } from '../../../utils/typography'
import { Container } from '../container'
import { HeaderMenu } from './headerMenu'
import { HeaderMobileMenu } from './headerMobileMenu'

// import moon from './moon.svg'
// import sun from './sun.svg'

const HeaderContainer = styled.header`
  border-bottom: 5px solid var(--color-primary);
  margin-bottom: ${rhythm(1)};
`

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: auto max-content;
  grid-template-rows: auto;
  gap: 1rem;
  grid-template-areas: 'logo navigation';
  position: relative;

  margin-bottom: 0;
`

const HeaderLink = styled(Link)`
  color: var(--color-text);
  text-decoration: none;
  grid-area: logo;
`

const HeaderTitle = styled.div<{
  logo: string
}>`
  line-height: ${rhythm(2)};
  padding-left: ${rhythm(2.5)};
  background-image: url(${({ logo }) => logo});
  background-size: contain;
  background-position: 0 50%;
  background-repeat: no-repeat;
  margin: 0;
  font-size: ${rhythm(1)};
`

const MenuContainer = styled.nav<{
  $open: boolean
}>`
  grid-area: navigation;
`

const ThemeToggle = () => {
  return null

  // const darkMode = useDarkMode()

  // return (
  //   <CheckboxToggle
  //     css={`
  //       margin-right: ${rhythm(0.5)};
  //     `}
  //     imageOn={moon}
  //     imageOff={sun}
  //     checked={darkMode.value}
  //     onChange={darkMode.toggle}
  //   />
  // )
}

export const Header: FunctionComponent<{
  location: PageProps['location']
}> = ({ location }) => {
  const {
    directus: { navigation },
  } = useStaticQuery<
    WrappedWithDirectus<{ navigation: Array<Navigation> }>
  >(graphql`
    query {
      directus {
        navigation(
          filter: {
            status: { _eq: "published" }
            navigation: { _eq: "header" }
          }
          sort: ["order"]
        ) {
          id
          customUrl
          slug
          title
          order
        }
      }
    }
  `)

  const navigations = navigation.map(nav => ({
    external: !!nav.customUrl,
    url: nav.customUrl || pagePath(nav.slug[0]),
    title: nav.title,
    current: nav.customUrl
      ? false
      : pagePath(nav.slug[0]) === location.pathname,
  }))

  return (
    <HeaderContainer>
      <Grid>
        <HeaderLink to="/">
          <HeaderTitle
            as={location.pathname === '/' ? 'h1' : 'h2'}
            logo={'fixed.src'}
          >
            MoscowJS
          </HeaderTitle>
        </HeaderLink>
        <MenuContainer role="navigation" $open={false}>
          <ThemeToggle />
          <HeaderMenu navigation={navigations} />
          <HeaderMobileMenu navigation={navigations} />
        </MenuContainer>
      </Grid>
    </HeaderContainer>
  )
}
