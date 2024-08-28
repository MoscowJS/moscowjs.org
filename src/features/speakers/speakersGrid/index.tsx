import React, { FunctionComponent } from 'react'

import styled from 'styled-components'

import type { Speaker } from 'models'
import { rhythm } from 'utils/typography'
import { SpeakerPhoto } from '../speakerPhoto'

const SpeakersContainer = styled.ul`
  --item-width: ${rhythm(5)};

  margin: 0 0 ${rhythm(2)};
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--item-width));
  grid-gap: ${rhythm(1)};
  justify-content: space-between;
`

const Speaker = styled.li`
  display: inline-block;
  overflow: hidden;
  text-align: center;
  font-size: ${rhythm(0.5)};
  margin: 0;
`

export const SpeakersGrid: FunctionComponent<{
  speakers: Array<Speaker>
}> = ({ speakers }) => {
  return (
    <SpeakersContainer>
      {speakers.map(speaker => {
        return (
          <Speaker key={speaker.name}>
            <SpeakerPhoto speaker={speaker} />
          </Speaker>
        )
      })}
    </SpeakersContainer>
  )
}
