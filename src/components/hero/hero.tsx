import Img from "gatsby-image/withIEPolyfill"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { flexAlign, HeroBackdropProps, HeroContainerProps } from "./hero.h"
import { Layout } from "../layout/layout"
import { rhythm } from "../../utils/typography"
import { FluidObject } from "gatsby-image"

const defaultHeight = "800px"
const darkFilter = "blur(4px) brightness(0.3)"

const HeroBackground = styled.article<{
  height?: string
}>`
  min-height: ${({ height }) => height || defaultHeight};
  margin-bottom: ${rhythm(1)};
  position: relative;
`

const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
  image: FluidObject | FluidObject[]
}> & {
  Container: typeof HeroContainer
} = ({ children, height, image }) => {
  return (
    <HeroBackground height={height}>
      <HeroImage>
        <Img
          css={`
            height: 100%;
          `}
          fluid={image}
          objectFit="cover"
          objectPosition="50% 50%"
        />
      </HeroImage>

      <HeroBackdrop height={height}>{children}</HeroBackdrop>
    </HeroBackground>
  )
}

Hero.Container = HeroContainer
