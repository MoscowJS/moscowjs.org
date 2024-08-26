import React, { FunctionComponent, StatelessComponent } from 'react'
import styled from 'styled-components'
import {
  flexAlign,
  IconProps,
  ImageContainerProps,
  ImageProps,
  ItemContentProps,
} from './item.h'
import { getSize, rhythm } from '../../../utils/typography'

export const Item: FunctionComponent & {
  Image: typeof ItemImage
  Content: typeof ItemContent
  Header: typeof ItemHeader
  Icon: typeof ItemIcon
  Meta: typeof ItemMeta
  ImageContainer: typeof ImageContainer
} = styled.div`
  margin-bottom: ${rhythm(1)};

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  @media screen and (min-width: 600px) {
    display: flex;
  }
` as any

const ImageContainer = styled.div<ImageContainerProps>`
  width: ${({ size }) => getSize(size)};
  max-width: 100%;
  flex: 0 0 auto;
  order: ${({ position }) => (position === 'right' ? 1 : 0)};
  line-height: 1;
  align-self: ${({ verticalAlign = 'auto' }) => flexAlign[verticalAlign]};

  ${({ position }) =>
    position === 'right'
      ? `margin-left: ${rhythm(0.5)};`
      : `margin-right: ${rhythm(0.5)};`}

  ${({ size }) =>
    size === 'xxs' || size === 'xs'
      ? `
    float: left;
  `
      : ''}
  
  ${({ size }) =>
    size === 's'
      ? `
    @media screen and (min-width: 375px) {
      float: left;
    }
  `
      : ''}

  ${({ size }) =>
    size === 'm'
      ? `
    @media screen and (min-width: 530px) {
      float: left;
    }
  `
      : ''}
  
  @media screen and (min-width: 600px) {
    float: none;
  }
`

const ItemImage: FunctionComponent<ImageProps> = ({
  size,
  src,
  alt,
  verticalAlign,
  position,
}) => {
  return (
    <ImageContainer
      position={position}
      size={size}
      verticalAlign={verticalAlign}
    >
      <img src={src} alt={alt} />
    </ImageContainer>
  )
}

const ItemIcon: FunctionComponent<IconProps> = ({
  size,
  Icon,
  verticalAlign,
  position,
}) => {
  return (
    <ImageContainer
      position={position}
      size={size}
      verticalAlign={verticalAlign}
    >
      <Icon size={getSize(size)} />
    </ImageContainer>
  )
}

const ItemContent = styled.div<ItemContentProps>`
  flex: 1 1 auto;
  align-self: ${({ verticalAlign = 'auto' }) => flexAlign[verticalAlign]};

  > *:last-child {
    margin: 0;
  }
`

const ItemHeader = styled.h3`
  font-size: ${rhythm(1)};
  font-weight: 600;
  margin-bottom: ${rhythm(0.5)};
`

const ItemMeta = styled.div`
  font-size: ${rhythm(0.5)};
`

Item.Image = ItemImage
Item.Content = ItemContent
Item.Header = ItemHeader
Item.Icon = ItemIcon
Item.Meta = ItemMeta
Item.ImageContainer = ImageContainer
