import styled from "styled-components"

export const Button = styled.button`
  cursor: pointer;
  border: 2px solid var(--color-primary);

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
