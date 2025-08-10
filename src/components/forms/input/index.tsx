import styled from 'styled-components'
import { Input as ReakitInput } from 'reakit/Input'

export const Input = styled(ReakitInput)`
  border: none;
  transition: box-shadow 0.2s linear;
  background: transparent;
  box-shadow: var(--color-primary) 0px 1px;
  color: var(--color-text);

  &:focus {
    box-shadow: var(--color-primary) 0px 3px;
  }
`
