import React from "react"
import styled from "styled-components"
import { Badge } from "components/elements"
import { rhythm } from "utils/typography"

const BadgeButtonStyled = styled(Badge)<{ active?: boolean }>`
  border-color: ${({ active }) =>
    active ? `var(--color-primary)` : `var(--color-text)`};
  color: ${({ active }) =>
    active ? `var(--color-primary)` : `var(--color-text)`};

  margin: 0 0 ${rhythm(0.4)} ${rhythm(0.4)};
`

export const BadgeButton: typeof BadgeButtonStyled = ((props: any) => {
  return <BadgeButtonStyled {...props} />
}) as any
