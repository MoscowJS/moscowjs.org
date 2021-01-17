import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { VoteButton } from "../voteButton"
import { Flipped, Flipper } from "react-flip-toolkit"
import { Panel } from "components/layout"
import { QuestionData } from "models"
import { rhythm } from "utils/typography"
import { ThumbsUp } from "react-feather"

const QuestionsListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: ${rhythm(2)};

  li {
    display: block;
    margin-bottom: ${rhythm(1)};

    &:last-child {
      margin: 0;
    }

    &::after {
      content: "";
      display: table;
      clear: both;
    }

    p:first-of-type {
      margin: 0;
      font-size: ${rhythm(0.5)};
    }
  }
`

export const QuestionsList: FunctionComponent<{
  questions: QuestionData[]
}> = ({ questions }) => {
  return (
    <>
      <QuestionsListContainer>
        <Flipper flipKey={questions.map(({ id }) => id).join(", ")}>
          {questions.map(
            ({ userHasVoted, id, votes, question, created, author }) => {
              return (
                <Flipped key={id} flipId={id}>
                  <li>
                    <Panel>
                      <VoteButton
                        as="button"
                        userHasVoted={userHasVoted}
                        disabled={userHasVoted}
                      >
                        {votes} <ThumbsUp size={rhythm(0.6)} />
                      </VoteButton>
                      <p>
                        {author || "Анонимно"}, {created}
                      </p>
                      <p className="question">{question}</p>
                    </Panel>
                  </li>
                </Flipped>
              )
            }
          )}
        </Flipper>
      </QuestionsListContainer>
    </>
  )
}
