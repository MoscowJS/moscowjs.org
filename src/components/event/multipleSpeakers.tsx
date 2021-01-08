import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Markdown } from "../markdown/markdown"
import { rhythm } from "../../utils/typography"
import { SpeakerPhoto } from "../speakerPhoto/speakerPhoto"
import { SpeakersGrid } from "../speakersGrid/speakersGrid"
import { TalkData } from "../../models/talk.h"
import { talkPath } from "../../utils/paths"
import { Link } from "gatsby"

export const TalkMultipleSpeaker: FunctionComponent<{ talk: TalkData }> = ({
  talk,
}) => {
  const speakers = talk.Speakers

  return (
    <>
      <h3>
        <Link to={talkPath(talk.Title)}>{talk.Title}</Link>
      </h3>
      <Markdown>{talk.Theses}</Markdown>
      <h4>Спикеры</h4>

      <SpeakersGrid speakers={speakers} />
    </>
  )
}
