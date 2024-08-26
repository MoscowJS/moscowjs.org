import React, { FunctionComponent } from 'react'

import styled from 'styled-components'

import { eventPath, talkPath } from 'utils/paths'
import { rhythm } from 'utils/typography'

import { SpeakerPhoto } from '../../speakers/speakerPhoto'
import { SpeakersGrid } from '../../speakers/speakersGrid'

import { Talk as TalkType } from 'models'
import { Item, Markdown } from 'components/layout'
import { Link } from 'gatsby'

const Meta = styled.a`
  display: inline-block;
  margin-right: ${rhythm(0.5)};
`

const TalkDescription: FunctionComponent<{
  talk: TalkType
  level: 1 | 2 | 3
}> = ({ talk, level }) => {
  const tag = (['h1', 'h2', 'h3'] as const)[level - 1]
  // const meetup = talk.Meetup[0].data

  return (
    <>
      <Item.Meta>
        {/* <Link to={eventPath(meetup.Slug)}>{meetup.Title}</Link>,{' '} */}
        {/* <time dateTime={meetup.Date}>
          {new Date(talk.Date).toLocaleDateString()}
        </time> */}
      </Item.Meta>
      <Item.Header as={tag}>
        <Link to={talkPath(talk.title)}>{talk.title}</Link>
      </Item.Header>
      <Markdown>{talk.theses}</Markdown>
      {/* <p>
        {talk.Slides_URL && <Meta href={talk.Slides_URL}>Слайды</Meta>}
        {talk.Record && <Meta href={talk.Record}>Запись</Meta>}
      </p> */}
    </>
  )
}

export const Talk: FunctionComponent<{
  talk: TalkData
  level: 1 | 2 | 3
}> & {
  Description: typeof TalkDescription
} = ({ talk, level }) => {
  const speakers = talk.Speakers

  if (speakers.length === 0) {
    return null
  }

  return speakers.length > 1 ? (
    <>
      <TalkDescription talk={talk} level={level} />
      <SpeakersGrid speakers={speakers} />
    </>
  ) : (
    <Item key={talk.Title}>
      <Item.ImageContainer size="s">
        <SpeakerPhoto speaker={talk.Speakers[0].data} />
      </Item.ImageContainer>
      <Item.Content>
        <TalkDescription talk={talk} level={level} />
      </Item.Content>
    </Item>
  )
}

Talk.Description = TalkDescription
