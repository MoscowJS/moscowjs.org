import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Calendar, Icon, MapPin, PenTool, Video } from "react-feather"
import { EventData } from "models/event.h"
import { EventLink } from "features/events/eventLink"
import { Item, Markdown } from "components/layout"
import { rhythm } from "utils/typography"
import { Talk } from "features/talks/talk"

type EventProps = {
  event: EventData
  short?: boolean
  isIndexPage?: boolean
}

const EventTitle = styled.h1`
  font-size: 2rem;
`

const EventMeta: FunctionComponent<{
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
            font-size: ${rhythm(0.75)};\
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

export const Event: FunctionComponent<EventProps> = ({
  event,
  short,
  isIndexPage,
}) => {
  const videoLink = event.Stream_link || event.Video_link
  const videoTitle =
    event.Completed || event.Video_link ? "Запись" : "Трансляция"

  return (
    <article>
      <EventTitle as={isIndexPage ? "h2" : "h1"}>
        <EventLink event={event} />
      </EventTitle>

      <Markdown>{event.Short_Announcement}</Markdown>

      <EventMeta Icon={Calendar} title="Когда">
        <p>
          <time dateTime={`${event.Date} 19:00`}>{event.Date}</time>
        </p>
      </EventMeta>

      {event.Address && (
        <EventMeta Icon={MapPin} title="Где">
          <p>
            {event.Address}
            {event.Company && (
              <>
                <br />
                <em>{event.Company.map(({ data }) => data.Name).join(", ")}</em>
              </>
            )}
          </p>
        </EventMeta>
      )}

      <EventMeta Icon={Video} title={videoTitle}>
        <p>
          {videoLink ? (
            <a href={videoLink}>{videoLink!.replace("https://", "")}</a>
          ) : (
            "Скоро будет"
          )}
        </p>
      </EventMeta>

      {!event.Completed && (
        <EventMeta Icon={PenTool} title="Регистрация">
          <p>
            {event.Registration_link ? (
              <a href={event.Registration_link}></a>
            ) : (
              "Не требуется"
            )}
          </p>
        </EventMeta>
      )}

      {!short && (
        <>
          <Markdown>{event.Long_Announcement}</Markdown>

          {event.Talks && (
            <>
              <h3>О чем будем говорить</h3>

              {event.Talks.map(({ data }) => {
                return <Talk talk={data} level={2} />
              })}
            </>
          )}
        </>
      )}
    </article>
  )
}
