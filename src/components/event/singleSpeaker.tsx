import React, { FunctionComponent } from "react"
import { SquarePhoto } from "./squarePhoto"
import { Item } from "../../uikit"
import { Markdown } from "../markdown/markdown"
import { TalkData } from "../../models/talk.h"
import { talkPath } from "../../utils/paths"
import { Link } from "gatsby"

export const TalkSingleSpeaker: FunctionComponent<{ talk: TalkData }> = ({
  talk,
}) => {
  const speaker = talk.Speakers[0].data

  return (
    <Item key={talk.Title}>
      <Item.ImageContainer size="small">
        <SquarePhoto>
          <img src={speaker.Photo[0].thumbnails.large.url} alt={speaker.Name} />
        </SquarePhoto>
      </Item.ImageContainer>
      <Item.Content>
        <Item.Header>
          <Link to={talkPath(talk.Title)}>{talk.Title}</Link>
        </Item.Header>
        <h4>
          {speaker.Name}
          {speaker.Company && (
            <>
              {", "}
              <em>{speaker.Company}</em>
            </>
          )}
        </h4>
        <Markdown>{talk.Theses}</Markdown>
      </Item.Content>
    </Item>
  )
}
