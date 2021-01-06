import React, { FunctionComponent, StatelessComponent } from "react"
import styled from "styled-components"
import { rhythm } from "../../utils/typography"
import {
  flexAlign,
  IconProps,
  ImageContainerProps,
  ImageProps,
  ItemContentProps,
  sizes,
} from "./item.h"

const getSize = (size?: keyof typeof sizes) => sizes[size || "tiny"]

export const Item: FunctionComponent & {
  Image: typeof ItemImage
  Content: typeof ItemContent
  Header: typeof ItemHeader
  Icon: typeof ItemIcon
  Meta: typeof ItemMeta
  ImageContainer: typeof ImageContainer
} = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1)};
` as any

const ImageContainer = styled.div<ImageContainerProps>`
  margin-right: ${rhythm(0.5)};
  width: ${({ size }) => getSize(size)};
  flex: 0 0 auto;
  line-height: 1;

  align-self: ${({ verticalAlign = "auto" }) => flexAlign[verticalAlign]};

  img {
    width: ${({ size }) => getSize(size)};
    height: auto;
    object-fit: cover;
    margin: 0;
    filter: grayscale(1);
  }
`

const ItemImage: FunctionComponent<ImageProps> = ({
  size,
  src,
  alt,
  verticalAlign,
}) => {
  return (
    <ImageContainer size={size} verticalAlign={verticalAlign}>
      <img src={src} alt={alt} />
    </ImageContainer>
  )
}

const ItemIcon: FunctionComponent<IconProps> = ({
  size,
  Icon,
  verticalAlign,
}) => {
  return (
    <ImageContainer size={size} verticalAlign={verticalAlign}>
      <Icon size={getSize(size)} />
    </ImageContainer>
  )
}

const ItemContent = styled.div<ItemContentProps>`
  flex: 1 1 auto;
  align-self: ${({ verticalAlign = "auto" }) => flexAlign[verticalAlign]};

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
