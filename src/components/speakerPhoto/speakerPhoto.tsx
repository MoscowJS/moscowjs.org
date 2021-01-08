import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { rhythm } from "../../utils/typography"
import { SpeakerData } from "../../models/speaker.h"
import { speakerPath } from "../../utils/paths"
import { Link } from "gatsby"
import { UserX } from "react-feather"

const SquarePhoto = styled.div`
  width: 100%;
  padding-top: 100%;
  height: 0;
  overflow: hidden;
  position: relative;
  margin-bottom: ${rhythm(0.5)};

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    vertical-align: top;
    object-fit: cover;
    filter: grayscale(1);
  }

  svg {
    position: absolute;
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
  }
`

export const SpeakerPhoto: FunctionComponent<{
  speaker: Pick<SpeakerData, "Name" | "Company" | "Photo">
}> & {
  Photo: typeof SquarePhoto
} = ({ speaker }) => {
  return (
    <div>
      <SquarePhoto>
        {speaker.Photo ? (
          <img src={speaker.Photo[0].thumbnails.large.url} alt={speaker.Name} />
        ) : (
          <UserX size="100%" />
        )}
      </SquarePhoto>
      <p
        css={`
          text-align: center;
          font-size: ${rhythm(0.5)};
        `}
      >
        <Link to={speakerPath(speaker.Name)}>{speaker.Name}</Link>
        {speaker.Company && (
          <>
            {", "}
            <em>{speaker.Company}</em>
          </>
        )}
      </p>
    </div>
  )
}

SpeakerPhoto.Photo = SquarePhoto
