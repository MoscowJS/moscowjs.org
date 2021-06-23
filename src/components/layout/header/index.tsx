import moon from "./moon.svg"
import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import sun from "./sun.svg"
import { ImageSharp, NavigationData } from "models"
import { pagePath } from "utils/paths"
import { rhythm } from "utils/typography"
import { CheckboxToggle } from "components/forms/checkboxToggle"
import { Container } from "components/layout"
import { graphql, Link, PageProps, useStaticQuery } from "gatsby"
import { HeaderMenu } from "./headerMenu"
import { HeaderMobileMenu } from "./headerMobileMenu"

const HeaderContainer = styled.header`
  border-bottom: 5px solid var(--color-primary);
  margin-bottom: ${rhythm(1)};
`

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: auto max-content;
  grid-template-rows: auto;
  gap: 1rem;
  grid-template-areas: "logo navigation";
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
        <MenuContainer role="navigation" $open={false}>
          <ThemeToggle />
          <HeaderMenu navigation={navigation} />
          <HeaderMobileMenu navigation={navigation} />
        </MenuContainer>
      </Grid>
    </HeaderContainer>
  )
}
