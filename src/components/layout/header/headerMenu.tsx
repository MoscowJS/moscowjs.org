import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import { NavigationItem } from "./index.h"
import styled from "styled-components"
import { rhythm } from "utils/typography"

const HeaderMenuContainer = styled.ul`
  display: none;
  list-style-type: none;
  margin: 0;

  @media screen and (min-width: 45rem) {
    display: inline-block;
  }
`

const HeaderMenuLink = styled.li<{
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

  @media screen and (min-width: 45rem) {
    display: inline-block;

    a {
      color: ${({ $current }) => ($current ? "#000" : "var(--color-text)")};
    }
  }
`

export const HeaderMenu: FunctionComponent<{
  navigation: NavigationItem[]
}> = ({ navigation }) => {
  return (
    <HeaderMenuContainer role="navigation">
      {navigation.map(({ external, url, title, current }) => (
        <HeaderMenuLink $current={current} key={url}>
          {external ? <a href={url}>{title}</a> : <Link to={url}>{title}</Link>}
        </HeaderMenuLink>
      ))}
    </HeaderMenuContainer>
  )
}
