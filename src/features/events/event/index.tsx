import React, { FunctionComponent } from 'react'
import { Calendar, MapPin, PenTool, Video } from 'react-feather'
import styled from 'styled-components'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import type {
  Company,
  Meetup,
  Paper,
  Partner,
  Speaker,
  Talk as TalkType,
} from '../../../models'
import { Markdown, Meta } from '../../../components/layout'
import { rhythm } from '../../../utils/typography'
import { PartnerLink } from '../../partners'
import { Talk } from '../../talks'
import { EventTimeTable } from '../eventTimeTable'
import { EventLink } from '../eventLink'

type EventProps = {
  event: Pick<
    Meetup<
      Pick<
        TalkType<
          Pick<Meetup, 'id' | 'slug' | 'title' | 'date_start'>,
          Pick<Speaker, 'id' | 'name' | 'photo' | 'talks'>,
          Pick<Paper, 'id' | 'title' | 'theses'>
        >,
        | 'id'
        | 'paper'
        | 'company'
        | 'scene'
        | 'start_time'
        | 'speakers'
        | 'meetup_id'
        | 'slides_url'
        | 'record'
      >,
      never,
      Pick<Company, 'id' | 'name'>,
      Pick<Partner, 'id' | 'name' | 'link' | 'description'>
    >,
    | 'id'
    | 'type'
    | 'slug'
    | 'title'
    | 'title_formatted'
    | 'talks'
    | 'status'
    | 'address'
    | 'partners'
    | 'date_start'
    | 'date_end'
    | 'companies'
    | 'timetable'
    | 'stream_link'
    | 'video_link'
    | 'registration_link'
    | 'announcement_short'
    | 'announcement_long'
  >
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
  const date = new Date(event.date_start)
  const formattedDate = format(date, 'd MMMM y, HH:mm', {
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
  if (!event.address) {
    return null
  }

  return (
    <Meta Icon={MapPin} title="Где">
      <p>
        {event.address}
        {event.companies && (
          <>
            <br />
            <em>
              {event.companies
                .map(({ companies_id: company }) => company.name)
                .join(', ')}
            </em>
          </>
        )}
      </p>
    </Meta>
  )
}

const MetaVideo = ({ event }: EventProps) => {
  const videoLink = event.stream_link || event.video_link
  const videoTitle = event.status === 'завершен' ? 'Запись' : 'Трансляция'

  return (
    <Meta Icon={Video} title={videoTitle}>
      <p>
        {videoLink ? (
          <a href={videoLink}>{videoLink!.replace('https://', '')}</a>
        ) : (
          'Скоро будет'
        )}
      </p>
    </Meta>
  )
}

const MetaRegistration = ({ event }: EventProps) => {
  if (event.status === 'завершен') {
    return null
  }

  if (event.type === 'online') {
    return null
  }

  if (!event.registration_link) {
    return (
      <Meta Icon={PenTool} title="Регистрация">
        <p>Скоро будет</p>
      </Meta>
    )
  }

  return (
    <Meta Icon={PenTool} title="Регистрация">
      <p>
        <a href={event.registration_link}>{event.registration_link}</a>
      </p>
    </Meta>
  )
}

const TalksList = ({ event }: EventProps) => {
  if (event.talks) {
    return (
      <>
        <h3>
          {event.status === 'завершен'
            ? 'О чём говорили'
            : 'О чём будем говорить'}
        </h3>
        {event.talks
          .sort((a, b) => {
            const aStartTime = a.start_time
            const bStartTime = b.start_time
            if (!(aStartTime && bStartTime)) {
              return 0
            }
            return aStartTime > bStartTime ? 1 : -1
          })
          .map(talk => {
            return (
              <Talk
                event={event}
                talk={talk}
                level={2}
                key={talk.paper.title}
              />
            )
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
      <EventTitle as={isIndexPage ? 'h2' : 'h1'}>
        <EventLink event={event} />
      </EventTitle>

      <Section>
        <Markdown>{event.announcement_short}</Markdown>
      </Section>

      <Section>
        <MetaDate event={event} />
        <MetaAddress event={event} />
        <MetaVideo event={event} />
        <MetaRegistration event={event} />
      </Section>

      {!short && (
        <>
          {event.announcement_long && (
            <Section>
              <Markdown>{event.announcement_long}</Markdown>
            </Section>
          )}
          {event.timetable && (
            <Section>
              <EventTimeTable event={event} />
            </Section>
          )}
          {event.talks && (
            <Section>
              <TalksList event={event} />
            </Section>
          )}
        </>
      )}

      {!short && event.partners && event.partners.length !== 0 && (
        <Section>
          <h3>Партнеры мероприятия</h3>
          {event.partners.map(({ partners_id: partner }) => (
            <PartnerLink partner={partner} />
          ))}
        </Section>
      )}
    </article>
  )
}
