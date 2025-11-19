import styled from 'styled-components'

import { getSize, rhythm } from '../../../utils/typography'

export const Badge = styled.button<{ size?: string }>`
  padding: 0 5px;

  border: 2px solid var(--color-text);
  border-radius: ${rhythm(1.2)};
  background: none;

  font-size: ${rhythm(0.75)};
  line-height: calc(${({ size }) => getSize(size || 'xxxs')} - 4px);
  min-width: ${({ size }) => getSize(size || 'xxxs')};

  cursor: pointer;

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
