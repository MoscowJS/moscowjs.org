import styled from "styled-components"
import { getSize, rhythm } from "utils/typography"

export const Badge = styled.span<{ size: string }>`
  padding: 0 5px;

  border: 2px solid var(--color-text);
  border-radius: ${rhythm(1.2)};
  background: none;

  font-size: ${rhythm(0.75)};
  line-height: calc(${({ size }) => getSize(size)} - 4px);
`
