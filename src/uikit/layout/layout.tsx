import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { rhythm } from "../../utils/typography"
import "./layout.css"

const Container = styled.div`
  margin: 0 auto;
  max-width: ${rhythm(32)};
  padding: 0 ${rhythm(1)};
`

export const Layout: FunctionComponent & {
  Container: typeof Container
} = ({ children }) => {
  return <>{children}</>
}

Layout.Container = Container
