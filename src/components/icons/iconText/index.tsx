import React, { FunctionComponent } from 'react'

import { IconRound } from '../iconRound'

const transformNumber = (n: number) => {
  if (n >= 99_500_000) return `∞`
  if (n >= 9_950_000) return `${(n / 1_000_000).toFixed(0)}m`
  if (n >= 99_500) return `${(n / 1_000_000).toFixed(1)}m`
  if (n >= 9_950) return `${(n / 1000).toFixed(0)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`

  return `${n}`
}

export const IconText: FunctionComponent<{
  size: string
  children: string | number
}> = ({ size, children }) => {
  if (Number.isFinite(+children)) {
    return <IconRound size={size}>{transformNumber(+children)}</IconRound>
  }

  return <IconRound size={size}>{(children as string).slice(0, 3)}</IconRound>
}
