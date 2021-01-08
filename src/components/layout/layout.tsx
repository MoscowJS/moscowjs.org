import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { rhythm } from "../../utils/typography"
import "./layout.css"

const Container = styled.div`
  --container-width: ${rhythm(30)};

  margin: 0 auto;
  max-width: calc(var(--container-width) + ${rhythm(1)});
  padding: 0 ${rhythm(0.5)};
`

export const Layout: FunctionComponent & {
  Container: typeof Container
} = ({ children }) => {
  return <>{children}</>
}

Layout.Container = Container
