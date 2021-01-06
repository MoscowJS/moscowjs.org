import bgImage from "../../images/logo.png"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Layout } from "../../uikit"
import { NavigationData } from "../../models/navigation.h"
import { pagePath } from "../../utils/paths"
import { rhythm } from "../../utils/typography"
import { graphql, Link, PageProps, useStaticQuery } from "gatsby"

const Grid = styled(Layout.Container)`
  display: grid;
  grid-template-columns: auto max-content;
  grid-template-rows: auto;
  gap: 0px 0px;
  grid-template-areas: "logo navigation";
`

const HeaderLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;

  grid-area: logo;
`

const HeaderTitle = styled.div`
  line-height: ${rhythm(2)};
  padding-left: ${rhythm(3)};
  background-image: url(${bgImage});
  background-size: contain;
  background-position: 0 50%;
  background-repeat: no-repeat;
  margin: 0;
  font-size: ${rhythm(1)};
`
const MenuContainer = styled.nav`
  margin-left: -${rhythm(1)};
  grid-area: navigation;
`

const MenuLink = styled(Link)<{
  $current: boolean
}>`
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.8rem;
  line-height: ${rhythm(2)};
  font-weight: 300;

  display: inline-block;
  padding: 0 ${rhythm(0.5)};

  background-color: ${({ $current }) =>
    $current ? "var(--primary-color)" : "none"};
  color: ${({ $current }) => ($current ? "#000" : "var(--primary-text)")};
`

const HeaderContainer = styled.header`
  border-bottom: 5px solid var(--primary-color);

  margin-bottom: ${rhythm(1)};
`

export const Header: FunctionComponent<{
  location: PageProps["location"]
}> = ({ location }) => {
  const {
    allAirtablenavigation: { edges },
  } = useStaticQuery<{
    allAirtablenavigation: {
      edges: Array<{
        node: {
          data: NavigationData
        }
      }>
    }
  }>(graphql`
    {
      allAirtablenavigation(
        filter: { data: { navigation: { eq: "header" }, show: { eq: true } } }
      ) {
        edges {
          node {
            data {
              title
              slug
              order
            }
          }
        }
      }
    }
  `)

  const navigation = edges
    .map(({ node }) => ({
      url: pagePath(node.data.slug[0]),
      title: node.data.title,
      current: pagePath(node.data.slug[0]) === location.pathname,
      order: node.data.order,
    }))
    .sort((a, b) => a.order - b.order)

  return (
    <HeaderContainer>
      <Grid>
        <HeaderLink to="/">
          <HeaderTitle as={location.pathname === "/" ? "h1" : "h2"}>
            MoscowJS
          </HeaderTitle>
        </HeaderLink>
        <MenuContainer role="navigation">
          {navigation.map(({ url, title, current }) => (
            <MenuLink to={url} $current={current} key={url}>
              {title}
            </MenuLink>
          ))}
        </MenuContainer>
      </Grid>
    </HeaderContainer>
  )
}
