import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { VoteButton } from "../voteButton"
import { Flipped, Flipper } from "react-flip-toolkit"
import { Meta, Panel } from "components/layout"
import { QuestionData } from "models"
import { getSize, rhythm } from "utils/typography"
import { MoreHorizontal, ThumbsUp } from "react-feather"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { User } from "react-feather"

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
            ({ id, userCanVote, votes = 0, question, created, author, userCanEdit, userCanDelete }) => {
              return (
                <Flipped key={id} flipId={id}>
                  <li>
                    <Panel>
                      <div
                        css={`
                          display: flex;
                          justify-content: space-between;
                          align-items: flex-start;
                        `}
                      >
                        <Meta title={author || "Анонимно"} Icon={User}>
                          <p>
                            {format(new Date(created || 0), "d MMMM y, HH:mm", {
                              locale: ru,
                            })}
                          </p>
                        </Meta>
                        <div>
                          <MoreHorizontal size={getSize('xxxs')}/>
                          <VoteButton
                            as="button"
                            size="xxxs"
                            userCanVote={!!userCanVote}
                            disabled={!userCanVote}
                            onClick={() => upvote(id!)}
                          >
                            {votes} <ThumbsUp size={rhythm(0.6)} />
                          </VoteButton>
                        </div>
                      </div>
                      
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
