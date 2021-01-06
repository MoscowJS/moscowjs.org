import React, { FunctionComponent } from "react"
import { SquarePhoto } from "./squarePhoto"
import { Item } from "../../uikit"
import { Markdown } from "../markdown/markdown"
import { speakerPath, talkPath } from "../../utils/paths"
import { TalkData } from "../../models/talk.h"
import { Link } from "gatsby"
import { UserX } from "react-feather"

export const TalkSingleSpeaker: FunctionComponent<{ talk: TalkData }> = ({
  talk,
}) => {
  const speaker = talk.Speakers[0].data

  return (
    <Item key={talk.Title}>
      <Item.ImageContainer size="small">
        <SquarePhoto>
          {speaker.Photo ? (
            <img
              src={speaker.Photo[0].thumbnails.large.url}
              alt={speaker.Name}
            />
          ) : (
            <UserX
              size="100%"
              css={`
                color: var(--text-color);
              `}
            />
          )}
        </SquarePhoto>
      </Item.ImageContainer>
      <Item.Content>
        <Item.Header>
          <Link to={talkPath(talk.Title)}>{talk.Title}</Link>
        </Item.Header>
        <h4>
          <Link to={speakerPath(speaker.Name)}>{speaker.Name}</Link>
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
