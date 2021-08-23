import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Calendar, MapPin, PenTool, Video } from "react-feather"
import { EventData } from "models/event.h"
import { EventLink } from "features/events/eventLink"
import { Markdown, Meta } from "components/layout"
import { Talk } from "features/talks/talk"
import { Telegram } from "components/icons"
import { PartnerLink } from "features/partners"

type EventProps = {
  event: EventData
  short?: boolean
  isIndexPage?: boolean
}

const EventTitle = styled.h1`
  font-size: 2rem;
`

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

      <Meta Icon={Calendar} title="Когда">
        <p>
          <time dateTime={`${event.Date} 19:00`}>{event.Date}</time>
        </p>
      </Meta>

      {event.Address && (
        <Meta Icon={MapPin} title="Где">
          <p>
            {event.Address}
            {event.Company && (
              <>
                <br />
                <em>{event.Company.map(({ data }) => data.Name).join(", ")}</em>
              </>
            )}
          </p>
        </Meta>
      )}

      <Meta Icon={Video} title={videoTitle}>
        <p>
          {videoLink ? (
            <a href={videoLink}>{videoLink!.replace("https://", "")}</a>
          ) : (
            "Скоро будет"
          )}
        </p>
      </Meta>

      {!event.Completed && (
        <Meta Icon={PenTool} title="Регистрация">
          <p>
            {event.Registration_link ? (
              <a href={event.Registration_link}></a>
            ) : (
              "Скоро будет"
            )}
          </p>
        </Meta>
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

      {!short && event.Partners && (
        <>
          <h3>Партнеры мероприятия</h3>
          {event.Partners.map(({ data }) => (
            <PartnerLink partnerData={data} />
          ))}
        </>
      )}
    </article>
  )
}
