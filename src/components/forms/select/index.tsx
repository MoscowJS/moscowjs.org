import styled from 'styled-components'

export const Select = styled.select`
  border: none;
  transition: box-shadow 0.2s linear;
  background: transparent;
  box-shadow: var(--color-primary) 0px 1px;
  color: var(--color-text);
  max-width: 100%;
  width: 100%;

  &:focus {
    box-shadow: var(--color-primary) 0px 3px;
  }
`
