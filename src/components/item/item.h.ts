import { Icon } from "react-feather"

export const sizes: { [K: string]: string } = {
  micro: "2rem",
  tiny: "3rem",
  small: "7rem",
  medium: "11rem",
  large: "15rem",
  huge: "19rem",
}

export enum flexAlign {
  auto = "auto",
  top = "flex-start",
  bottom = "flex-end",
  center = "center",
}

export type ImageContainerProps = {
  size?: string
  verticalAlign?: keyof typeof flexAlign
  position?: "left" | "right"
}

export type ImageProps = {
  size?: string
  verticalAlign?: keyof typeof flexAlign
  src: string
  alt: string
  position?: "left" | "right"
}

export type IconProps = {
  size?: string
  verticalAlign?: keyof typeof flexAlign
  Icon: Icon
  position?: "left" | "right"
}

export type ItemContentProps = {
  verticalAlign?: keyof typeof flexAlign
}
