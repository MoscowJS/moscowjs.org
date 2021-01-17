import styled from "styled-components"
import { rhythm } from "utils/typography"

export const Input = styled.input`
  border: none;
  transition: box-shadow 0.2s linear;
  background: transparent;
  box-shadow: var(--color-primary) 0px 1px;
  color: var(--color-text);

  &:focus {
    box-shadow: var(--color-primary) 0px 3px;
  }
`
