import React, { FunctionComponent } from "react"
import { Item } from "../item/item"
import { Markdown } from "../markdown/markdown"
import { speakerPath, talkPath } from "../../utils/paths"
import { SpeakerPhoto } from "../speakerPhoto/speakerPhoto"
import { TalkData } from "../../models/talk.h"
import { Link } from "gatsby"

export const TalkSingleSpeaker: FunctionComponent<{ talk: TalkData }> = ({
  talk,
}) => {
  const speaker = talk.Speakers[0].data

  return (
    <Item key={talk.Title}>
      <Item.ImageContainer size="small">
        <SpeakerPhoto speaker={speaker} />
      </Item.ImageContainer>
      <Item.Content>
        <Item.Header>
          <Link to={talkPath(talk.Title)}>{talk.Title}</Link>
        </Item.Header>
        <Markdown>{talk.Theses}</Markdown>
      </Item.Content>
    </Item>
  )
}
