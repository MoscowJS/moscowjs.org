import React, { FunctionComponent } from 'react'

import { Link } from 'gatsby'
// import Img from 'gatsby-image'
import { UserX } from 'react-feather'

import type { Speaker } from 'models'
import { rhythm } from 'utils/typography'
import { speakerPath } from 'utils/paths'

export const SpeakerPhoto: FunctionComponent<{
  speaker: Pick<Speaker, 'name' | 'photo'>
}> = ({ speaker }) => {
  return (
    <div>
      {speaker.photo && (
        // (
        //   <Img
        //     fluid={speaker.Photo.localFiles[0].childImageSharp.fluid}
        //     alt={speaker.Name}
        //   />
        // ) :
        <div
          css={`
            line-height: 0;
          `}
        >
          <UserX size="100%" />
        </div>
      )}
      <p
        css={`
          text-align: center;
          font-size: ${rhythm(0.5)};
        `}
      >
        <Link to={speakerPath(speaker.name)}>{speaker.name}</Link>
        {/* {speaker.Company && (
          <>
            {', '}
            <br />
            <em>{speaker.Company}</em>
          </>
        )} */}
      </p>
    </div>
  )
}
