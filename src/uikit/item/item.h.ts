import { Icon } from "react-feather"

export enum sizes {
  micro = "2rem",
  tiny = "3rem",
  small = "7rem",
  medium = "11rem",
  large = "15rem",
  huge = "19rem",
}

export enum flexAlign {
  auto = "auto",
  top = "flex-start",
  bottom = "flex-end",
  center = "center",
}

export type ImageContainerProps = {
  size?: keyof typeof sizes
  verticalAlign?: keyof typeof flexAlign
}

export type ImageProps = {
  size?: keyof typeof sizes
  verticalAlign?: keyof typeof flexAlign
  src: string
  alt: string
}

export type IconProps = {
  size?: keyof typeof sizes
  verticalAlign?: keyof typeof flexAlign
  Icon: Icon
}

export type ItemContentProps = {
  verticalAlign?: keyof typeof flexAlign
}
