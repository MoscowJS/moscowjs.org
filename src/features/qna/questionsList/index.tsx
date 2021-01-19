import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { VoteButton } from "../voteButton"
import { Flipped, Flipper } from "react-flip-toolkit"
import { Panel } from "components/layout"
import { QuestionData } from "models"
import { rhythm } from "utils/typography"
import { ThumbsUp } from "react-feather"
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'


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
  upvote: (id: string) => Promise<any>
}> = ({ questions, upvote }) => {
  if (!questions.length) {
    return <p>Вопросов пока нет. Добавь свой!</p>
  }

  return (
    <>
      <QuestionsListContainer>
        <Flipper flipKey={questions.map(({ id }) => id).join(", ")}>
          {questions.map(
            ({ id, userCanVote, votes = 0, question, created, author }) => {
              return (
                <Flipped key={id} flipId={id}>
                  <li>
                    <Panel>
                      <VoteButton
                        as="button"
                        userCanVote={!!userCanVote}
                        disabled={!userCanVote}
                        onClick={() => upvote(id!)}
                      >
                        {votes} <ThumbsUp size={rhythm(0.6)} />
                      </VoteButton>
                      <p>
                        {author || "Анонимно"}, {format(new Date(created || 0), 'd MMMM y, HH:mm', { locale: ru })}
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
