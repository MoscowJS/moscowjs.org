import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Layout } from "../"
import { rhythm } from "../../utils/typography"

import {
  HeroBackdropProps,
  HeroBackgroundProps,
  HeroContainerProps,
  flexAlign,
} from "./hero.h"

const defaultHeight = "800px"
const darkFilter = "blur(4px) grayscale(100%) brightness(0.3)"

const HeroBackground = styled.article<HeroBackgroundProps>`
  min-height: ${({ height }) => height || defaultHeight};
  background-image: url(${({ image }) => image});
  background-position: 50% 50%;
  background-size: cover;

  margin-bottom: ${rhythm(1)};
`

const HeroBackdrop = styled.div<HeroBackdropProps>`
  min-height: ${({ height }) => height || defaultHeight};
  backdrop-filter: ${darkFilter};

  display: flex;
  flex-direction: column;
`

const HeroContainer = styled(Layout.Container)<HeroContainerProps>`
  padding-top: ${rhythm(1)};
  display: flex;
  flex-direction: column;

  flex: 1 1 auto;

  justify-content: ${({ verticalAlign = "auto" }) => flexAlign[verticalAlign]};
`

export const Hero: FunctionComponent<{
  height?: string
  image: string
}> & {
  Container: typeof HeroContainer
} = ({ children, height, image }) => {
  return (
    <HeroBackground height={height} image={image}>
      <HeroBackdrop height={height}>{children}</HeroBackdrop>
    </HeroBackground>
  )
}

Hero.Container = HeroContainer
