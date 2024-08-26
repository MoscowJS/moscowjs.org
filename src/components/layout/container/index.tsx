import styled from 'styled-components'
import { rhythm } from 'utils/typography'

export const Container = styled.div`
  margin: 0 auto;
  max-width: calc(var(--container-width) + ${rhythm(1)});
  width: 100%;
  padding: 0 ${rhythm(0.5)};

  margin-bottom: ${rhythm(1)};

  > *:last-child {
    margin-bottom: 0;
  }
`
