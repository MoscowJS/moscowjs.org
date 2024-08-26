import React, { FunctionComponent } from "react"
import { Icon } from "react-feather"
import styled from "styled-components"
import { rhythm } from "utils/typography"
import { Item } from "../item"

const SmallHeader = styled(Item.Header)`
  font-size: ${rhythm(0.75)};
  margin-bottom: 0;
`
export const Meta: FunctionComponent<{
  Icon?: Icon
  image?: string
  title: string
  titleLink?: string
}> = ({ Icon, image, title, children }) => {
  return (
    <Item>
      {Icon && <Item.Icon verticalAlign="center" size="xxs" Icon={Icon} />}
      {image && <Item.Image src={image} alt="Логотип партнера" />}
      <Item.Content verticalAlign="center">
        <SmallHeader as="h5">{title}</SmallHeader>
        {children}
      </Item.Content>
    </Item>
  )
}
