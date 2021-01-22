import React, { FunctionComponent } from "react"
import { Icon } from "react-feather"
import { rhythm } from "utils/typography"
import { Item } from "../item"

export const Meta: FunctionComponent<{
  Icon: Icon
  title: string
}> = ({ Icon, title, children }) => {
  return (
    <Item>
      <Item.Icon verticalAlign="center" size="xxs" Icon={Icon} />
      <Item.Content verticalAlign="center">
        <Item.Header
          as="h5"
          css={`
            font-size: ${rhythm(0.75)};
            margin-bottom: 0;
          `}
        >
          {title}
        </Item.Header>
        {children}
      </Item.Content>
    </Item>
  )
}
