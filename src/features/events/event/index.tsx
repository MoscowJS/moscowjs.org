import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Calendar, MapPin, PenTool, Video } from "react-feather"
import { EventData } from "models/event.h"
import { EventLink } from "features/events/eventLink"
import { EventTimeTable } from "features/events/eventTimeTable"
import { Markdown, Meta } from "components/layout"
import { Talk } from "features/talks/talk"
import { PartnerLink } from "features/partners"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { airtableDateFix } from "utils/airtableDateFix"
import { rhythm } from "utils/typography"

type EventProps = {
  event: EventData
  short?: boolean
  isIndexPage?: boolean
}

const EventTitle = styled.h1`
  font-size: 2rem;
`

const Section = styled.section`
  margin-bottom: ${rhythm(1)};
`

const MetaDate = ({ event }: EventProps) => {
  const date = airtableDateFix(new Date(event.Date))
  const formattedDate = format(date, "d MMMM y, HH:mm", {
    locale: ru,
  })

  return (
    <Meta Icon={Calendar} title="Когда">
      <p>
        <time dateTime={formattedDate}>{formattedDate}</time>
      </p>
    </Meta>
  )
}

const MetaAddress = ({ event }: EventProps) => {
  if (!event.Address) {
    return null
  }

  return (
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
  )
}

const MetaVideo = ({ event }: EventProps) => {
  const videoLink = event.Stream_link || event.Video_link
  const videoTitle = event.Completed ? "Запись" : "Трансляция"

  return (
    <Meta Icon={Video} title={videoTitle}>
      <p>
        {videoLink ? (
          <a href={videoLink}>{videoLink!.replace("https://", "")}</a>
        ) : (
          "Скоро будет"
        )}
      </p>
    </Meta>
  )
}

const MetaRegistration = ({ event }: EventProps) => {
  if (event.Completed) {
    return null
  }

  if (event.Type === "Online") {
    return null
  }

  if (!event.Registration_link) {
    return (
      <Meta Icon={PenTool} title="Регистрация">
        <p>Скоро будет</p>
      </Meta>
    )
  }

  return (
    <Meta Icon={PenTool} title="Регистрация">
      <p>
        <a href={event.Registration_link}>{event.Registration_link}</a>
      </p>
    </Meta>
  )
}

const TalksList = ({ event }: EventProps) => {
  if (event.Talks) {
    return (
      <>
        <h3>{event.Completed ? "О чём говорили" : "О чём будем говорить"}</h3>
        {event.Talks.map(({ data }) => {
          return <Talk talk={data} level={2} key={data.Title} />
        })}
      </>
    )
  }

  return null
}

export const Event: FunctionComponent<EventProps> = ({
  event,
  short,
  isIndexPage,
}) => {
  return (
    <article>
      <EventTitle as={isIndexPage ? "h2" : "h1"}>
        <EventLink event={event} />
      </EventTitle>

      <Section>
        <Markdown>{event.Short_Announcement}</Markdown>
      </Section>

      <Section>
        <MetaDate event={event} />
        <MetaAddress event={event} />
        <MetaVideo event={event} />
        <MetaRegistration event={event} />
      </Section>

      {!short && (
        <>
          {event.Long_Announcement && (
            <Section>
              <Markdown>{event.Long_Announcement}</Markdown>
            </Section>
          )}
          {event.Timetable && (
            <Section>
              <EventTimeTable event={event} />
            </Section>
          )}
          {event.Talks && (
            <Section>
              <TalksList event={event} />
            </Section>
          )}
        </>
      )}

      {!short && event.Partners && (
        <Section>
          <h3>Партнеры мероприятия</h3>
          {event.Partners.map(({ data }) => (
            <PartnerLink partnerData={data} />
          ))}
        </Section>
      )}
    </article>
  )
}
