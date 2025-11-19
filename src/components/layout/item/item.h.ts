import { Icon } from 'react-feather'

export enum flexAlign {
  auto = 'auto',
  top = 'flex-start',
  bottom = 'flex-end',
  center = 'center',
}

export type ImageContainerProps = {
  size?: string
  verticalAlign?: keyof typeof flexAlign
  position?: 'left' | 'right'
}

export type ImageProps = {
  size?: string
  verticalAlign?: keyof typeof flexAlign
  src: string
  alt: string
  position?: 'left' | 'right'
}

export type IconProps = {
  size?: string
  verticalAlign?: keyof typeof flexAlign
  Icon: Icon
  position?: 'left' | 'right'
}

export type ItemContentProps = {
  verticalAlign?: keyof typeof flexAlign
}
