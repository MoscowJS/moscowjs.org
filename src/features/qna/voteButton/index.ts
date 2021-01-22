import styled from "styled-components"
import { Badge } from "components/elements/badge"
import { rhythm } from "utils/typography"

export const VoteButton = styled(Badge)<{ userCanVote: boolean }>`
  border-color: ${({ userCanVote }) =>
    userCanVote ? `var(--color-text)` : `var(--color-primary)`};
  color: ${({ userCanVote }) =>
    userCanVote ? `var(--color-text)` : `var(--color-primary)`};
  cursor: pointer;
  margin: 0 0 ${rhythm(0.4)} ${rhythm(0.4)};

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
