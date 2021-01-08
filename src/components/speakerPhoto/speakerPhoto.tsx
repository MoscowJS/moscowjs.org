import Img from "gatsby-image"
import React, { FunctionComponent } from "react"
import { rhythm } from "../../utils/typography"
import { SpeakerData } from "../../models/speaker.h"
import { speakerPath } from "../../utils/paths"
import { Link } from "gatsby"
import { UserX } from "react-feather"

export const SpeakerPhoto: FunctionComponent<{
  speaker: Pick<SpeakerData, "Name" | "Company" | "Photo">
}> = ({ speaker }) => {
  return (
    <div>
      {speaker.Photo ? (
        <Img
          fluid={speaker.Photo.localFiles[0].childImageSharp.fluid}
          alt={speaker.Name}
        />
      ) : (
        <div css={`line-height: 0;`}><UserX size="100%" /></div>
      )}
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
