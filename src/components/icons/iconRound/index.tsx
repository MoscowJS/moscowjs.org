import React from 'react'
import styled from 'styled-components'

import { getSize } from 'utils/typography'

const getFontSize = (children: any, size?: string) => {
  if (typeof children !== 'string') {
    return `calc(${getSize(size)} / 1.7)`
  }

  if (children.length < 3) return `calc(${getSize(size)} / 1.7)`
  if (children.length === 3) return `calc(${getSize(size)} / 2.4)`
  return `calc(${getSize(size)} / 3)`
}

export const IconRound = styled.span<{
  size?: string
}>`
  display: inline-block;
  height: ${({ size }) => getSize(size)};
  width: ${({ size }) => getSize(size)};

  line-height: calc(${({ size }) => getSize(size)} - 10px);
  text-align: center;
  white-space: nowrap;
  font-size: ${({ size, children }) => getFontSize(children, size)};
  font-weight: 700;
  color: var(--color-text);
  user-select: none;

  border: 5px solid var(--color-text);
  border-radius: calc(${({ size }) => getSize(size)} / 2);
`
