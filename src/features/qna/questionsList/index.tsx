import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { Flipped, Flipper } from "react-flip-toolkit"
import { QuestionData } from "models"
import { rhythm } from "utils/typography"
import { QuestionListItem } from "../questionListItem"

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
  }
`

export const QuestionsList: FunctionComponent<{
  questions: QuestionData[]
}> = ({ questions }) => {
  if (!questions.length) {
    return <p>Вопросов пока нет. Добавь свой!</p>
  }

  // TODO: выделить вопрос в отдельный компонент
  // тогда можно будет убрать userCanVote, и всю логику с голосами вынести в хук useUpvote
  return (
    <>
      <QuestionsListContainer>
        <Flipper flipKey={questions.map(({ id }) => id).join(", ")}>
          {questions.map(question => {
            return (
              <Flipped key={question.id} flipId={question.id}>
                <QuestionListItem {...question} />
              </Flipped>
            )
          })}
        </Flipper>
      </QuestionsListContainer>
    </>
  )
}
