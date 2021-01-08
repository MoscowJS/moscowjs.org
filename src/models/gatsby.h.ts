import { FixedObject, FluidObject } from "gatsby-image"

export type ImageSharp = {
  childImageSharp: {
    fluid: FluidObject
    fixed: FixedObject
  }
}
