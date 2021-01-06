import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { SquarePhoto } from "./squarePhoto"
import { Markdown } from "../markdown/markdown"
import { rhythm } from "../../utils/typography"
import { speakerPath, talkPath } from "../../utils/paths"
import { TalkData } from "../../models/talk.h"
import { Link } from "gatsby"
import { UserX } from "react-feather"

const Speaker = styled.div`
  flex: 1 1 0;
  margin-right: ${rhythm(1)};
  max-width: ${rhythm(7)};

  &:last-child {
    margin-right: 0;
  }
`

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

      <div css={"display: flex;"}>
        {speakers.map(({ data }) => {
          return (
            <Speaker key={data.Name}>
              <SquarePhoto>
                {data.Photo ? (
                  <img
                    src={data.Photo[0].thumbnails.large.url}
                    alt={data.Name}
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
              <p>
                <Link to={speakerPath(data.Name)}>{data.Name}</Link>
                {data.Company && (
                  <>
                    {", "}
                    <em>{data.Company}</em>
                  </>
                )}
              </p>
            </Speaker>
          )
        })}
      </div>
    </>
  )
}
