import React from "react"
import { EventLogo } from "../eventLogo"
import { EventData } from "models/event.h"
import { EventLink } from "features/events/eventLink"
import { FunctionComponent } from "react"
import { Item, Markdown } from "components/layout"

export const EventsFeed: FunctionComponent<{
  events: Array<{ data: EventData }>
}> = ({ events }) => {
  return (
    <>
      {events.map(({ data }) => (
        <Item key={data.Slug}>
          <Item.ImageContainer size="s">
            <EventLogo size="s" title={data.Title} />
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
