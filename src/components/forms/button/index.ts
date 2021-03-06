import styled from "styled-components"
import { Button as ReakitButton } from "reakit/Button"

export const Button = styled(ReakitButton)`
  cursor: pointer;
  border: 2px solid var(--color-primary);
  background: transparent;
  color: var(--color-text);

  &:hover {
    background: rgba(125, 125, 125, 0.5);
  }

  &:active {
    background: rgba(125, 125, 125, 0.8);
  }

  &:focus {
    box-shadow: var(--color-outline);
  }

  &[disabled]:hover,
  &[disabled]:active {
    background: none;
    cursor: initial;
  }
`
