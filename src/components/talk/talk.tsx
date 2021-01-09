import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { eventPath, talkPath } from "../../utils/paths"
import { Item } from "../item/item"
import { Markdown } from "../markdown/markdown"
import { rhythm } from "../../utils/typography"
import { SpeakerPhoto } from "../speakerPhoto/speakerPhoto"
import { SpeakersGrid } from "../speakersGrid/speakersGrid"
import { TalkData } from "../../models/talk.h"
import { Link } from "gatsby"

const Meta = styled.a`
  display: inline-block;
  margin-right: ${rhythm(0.5)};
`

const TalkDescription: FunctionComponent<{
  talk: TalkData
  level: 1 | 2 | 3
}> = ({ talk }) => {
  const meetup = talk.Meetup[0].data

  return (
    <>
      <Item.Meta>
        <Link to={eventPath(meetup.Slug)}>{meetup.Title}</Link>,{" "}
        <time dateTime={meetup.Date}>
          {new Date(talk.Date).toLocaleDateString()}
        </time>
      </Item.Meta>
      <Item.Header as="h1">
        <Link to={talkPath(talk.Title)}>{talk.Title}</Link>
      </Item.Header>
      <Markdown>{talk.Theses}</Markdown>
      <p>
        {talk.Slides_URL && <Meta href={talk.Slides_URL}>Слайды</Meta>}
        {talk.Record && <Meta href={talk.Record}>Запись</Meta>}
      </p>
    </>
  )
}

export const Talk: FunctionComponent<{
  talk: TalkData
  level: 1 | 2 | 3
}> & {
    Description: typeof TalkDescription
}= ({ talk, level }) => {
  const speakers = talk.Speakers

  return speakers.length > 1 ? (
    <>
      <TalkDescription talk={talk} level={level} />
      <SpeakersGrid speakers={speakers} />
    </>
  ) : (
    <Item key={talk.Title}>
      <Item.ImageContainer size="small">
        <SpeakerPhoto speaker={talk.Speakers[0].data} />
      </Item.ImageContainer>
      <Item.Content>
        <TalkDescription talk={talk} level={level} />
      </Item.Content>
    </Item>
  )
}


Talk.Description = TalkDescription