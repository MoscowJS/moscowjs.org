import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { ImageSharp } from "../../models/gatsby.h"
import { Layout } from "../layout/layout"
import { NavigationData } from "../../models/navigation.h"
import { pagePath } from "../../utils/paths"
import { rhythm } from "../../utils/typography"
import { ThemeToggle } from "../themeToggle/themeToggle"
import { graphql, Link, PageProps, useStaticQuery } from "gatsby"
import { Menu } from "react-feather"

const HeaderContainer = styled.header`
  border-bottom: 5px solid var(--color-primary);
  margin-bottom: ${rhythm(1)};
`

const Grid = styled(Layout.Container)`
  display: grid;
  grid-template-columns: auto max-content;
  grid-template-rows: auto;
  gap: 0px 0px;
  grid-template-areas: "logo navigation";
  position: relative;
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
  color: ${({ $open }) => ($open ? "#000" : "var(--color-text)")};

  button {
    background: ${({ $open }) => ($open ? "var(--color-primary)" : "none")};
  }

  ul {
    position: absolute;
    z-index: 100;
    width: 100vw;
    left: 0;
    top: calc(${rhythm(2)} + 5px);
    display: ${({ $open }) => ($open ? "block" : "none")};
    list-style-type: none;
    margin: 0;
    background: var(--color-primary);

    @media screen and (min-width: 991px) {
      background: none;
      color: inherit;
      display: inline-block;
      position: initial;
      width: auto;
    }
  }
`

const MenuLink = styled.li<{
  $current: boolean
}>`
  display: block;
  margin: 0;

  a {
    display: inline-block;
    padding: 0 ${rhythm(0.5)};

    background-color: ${({ $current }) =>
      $current ? "var(--color-primary)" : "none"};
    text-transform: uppercase;
    text-decoration: none;
    font-size: 0.8rem;
    line-height: ${rhythm(2)};
    font-weight: 300;
    color: #000;
  }

  @media screen and (min-width: 991px) {
    display: inline-block;

    a {
      color: ${({ $current }) => ($current ? "#000" : "var(--color-text)")};
    }
  }
`

const MenuBurger = styled.button`
  cursor: pointer;
  display: inline-block;
  padding: 0 ${rhythm(0.5)};
  line-height: ${rhythm(2)};
  border: 0;
  color: inherit;
  background: none;

  svg {
    vertical-align: middle;
  }

  @media screen and (min-width: 991px) {
    display: none;
  }
`

export const Header: FunctionComponent<{
  location: PageProps["location"]
}> = ({ location }) => {
  const {
    allAirtablenavigation: { nodes },
    logo: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery<{
    logo: ImageSharp
    allAirtablenavigation: {
      nodes: Array<{
        data: NavigationData
      }>
    }
  }>(graphql`
    {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 120, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      allAirtablenavigation(
        filter: { data: { navigation: { eq: "header" }, show: { eq: true } } }
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
    current: pagePath(data.slug[0]) === location.pathname,
  }))

  const [menuOpened, setMenuOpened] = useState(false)
  const handleClick = () => setMenuOpened(!menuOpened)

  return (
    <HeaderContainer>
      <Grid>
        <HeaderLink to="/">
          <HeaderTitle
            as={location.pathname === "/" ? "h1" : "h2"}
            logo={fixed.src}
          >
            MoscowJS
          </HeaderTitle>
        </HeaderLink>
        <MenuContainer role="navigation" $open={menuOpened}>
          <ThemeToggle />
          <MenuBurger onClick={handleClick}>
            <Menu size={rhythm(1)} />
          </MenuBurger>
          <ul>
            {navigation.map(({ external, url, title, current }) => (
              <MenuLink $current={current} key={url}>
                {external ? (
                  <a href={url}>{title}</a>
                ) : (
                  <Link to={url}>{title}</Link>
                )}
              </MenuLink>
            ))}
          </ul>
        </MenuContainer>
      </Grid>
    </HeaderContainer>
  )
}
