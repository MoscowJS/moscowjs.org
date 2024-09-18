import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import type { Meetup, Talk as TalkType } from '../../../models'
import { eventPath, talkPath } from '../../../utils/paths'
import { rhythm } from '../../../utils/typography'
import { Item, Markdown } from '../../../components/layout'

import { SpeakerPhoto } from '../../speakers/speakerPhoto'
import { SpeakersGrid } from '../../speakers/speakersGrid'

const Meta = styled.a`
  display: inline-block;
  margin-right: ${rhythm(0.5)};
`

const TalkDescription: FunctionComponent<{
  event: Pick<Meetup, 'id' | 'title' | 'slug' | 'date_start'>
  talk: TalkType
  level: 1 | 2 | 3
}> = ({ event, talk, level }) => {
  const tag = (['h1', 'h2', 'h3'] as const)[level - 1]

  return (
    <>
      <Item.Meta>
        <Link to={eventPath(event.slug)}>{event.title}</Link>,{' '}
        <time dateTime={event.date_start}>
          {new Date(event.date_start).toLocaleDateString()}
        </time>
      </Item.Meta>
      <Item.Header as={tag}>
        <Link to={talkPath(talk.title)}>{talk.title}</Link>
      </Item.Header>
      <Markdown>{talk.theses}</Markdown>
      <p>
        {talk.slides_url && <Meta href={talk.slides_url}>Слайды</Meta>}
        {talk.record && <Meta href={talk.record}>Запись</Meta>}
      </p>
    </>
  )
}

export const Talk: FunctionComponent<{
  event: Pick<Meetup, 'id' | 'title' | 'slug' | 'date_start'>
  talk: TalkType
  level: 1 | 2 | 3
}> & {
  Description: typeof TalkDescription
} = ({ event, talk, level }) => {
  const speakers = talk.speakers.map(speaker => speaker.persons_id)

  if (speakers.length === 0) {
    return null
  }

  return speakers.length > 1 ? (
    <>
      <TalkDescription event={event} talk={talk} level={level} />
      <SpeakersGrid speakers={speakers} />
    </>
  ) : (
    <Item key={talk.title}>
      <Item.ImageContainer size="s">
        <SpeakerPhoto
          speaker={talk.speakers[0]?.persons_id}
          companies={talk.company}
        />
      </Item.ImageContainer>
      <Item.Content>
        <TalkDescription event={event} talk={talk} level={level} />
      </Item.Content>
    </Item>
  )
}

Talk.Description = TalkDescription
