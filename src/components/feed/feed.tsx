import React from "react"
import { EventData } from "../../models/event.h"
import { EventLink } from "../eventLink/eventLink"
import { EventLogo } from "../eventLogo/eventLogo"
import { Item } from "../item/item"
import { Markdown } from "../markdown/markdown"
import { rhythm } from "../../utils/typography"
import { FunctionComponent } from "react"

export const Feed: FunctionComponent<{
  events: Array<{ data: EventData }>
}> = ({ events }) => {
  return (
    <>
      {events.map(({ data }) => (
        <Item
          css={`
            margin-bottom: ${rhythm(2)};
          `}
          key={data.Slug}
        >
          <Item.ImageContainer size="small">
            <EventLogo size="small" title={data.Title} />
          </Item.ImageContainer>
          <Item.Content>
            <Item.Meta>
              <time dateTime={data.Date}>{data.Date}</time>
              {data.Company && (
                <>
                  {" "}
                  (
                  <em>
                    {data.Company.map(({ data }) => data.Name).join(", ")}
                  </em>
                  )
                </>
              )}
            </Item.Meta>
            <Item.Header>
              <EventLink event={data} />
            </Item.Header>
            {data.Short_Announcement && (
              <div>
                <Markdown>{data.Short_Announcement}</Markdown>
              </div>
            )}
          </Item.Content>
        </Item>
      ))}
    </>
  )
}
