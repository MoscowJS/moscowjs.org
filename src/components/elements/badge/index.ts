import styled from "styled-components"
import { rhythm } from "utils/typography"

export const Badge = styled.span`
  padding: 0 5px;

  border: 2px solid var(--color-text);
  border-radius: ${rhythm(1.2)};
  background: none;

  font-size: ${rhythm(0.75)};
  line-height: calc(${rhythm(1.2)} - 4px);
`
