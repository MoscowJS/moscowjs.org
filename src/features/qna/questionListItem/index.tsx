import { Meta, Panel } from "components/layout"
import React, { FunctionComponent } from "react"
import { User, ThumbsUp } from "react-feather"
import { useIsAdmin, useUpvote } from "features/qna"
import { QuestionData } from "models"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { rhythm } from "utils/typography"
import styled from "styled-components"
import { QuestionAdmin } from "../questionAdmin"
import { BadgeButton } from "components/elements/badgeButton"

const QuestionContainer = styled.li`
  ${Panel} {
    position: relative;
  }
`

const UnpublishedNotice = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  backdrop-filter: blur(4px);
`

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
export const QuestionListItem: FunctionComponent<QuestionData> = props => {
  const {
    id,
    userCanVote,
    votes = 0,
    question,
    created,
    author,
    answered,
    published,
  } = props
  const upvote = useUpvote()
  const isAdmin = useIsAdmin()

  return (
    <QuestionContainer>
      <Panel>
        {!published && !isAdmin && (
          <UnpublishedNotice>
            <div>Твой вопрос на модерации</div>
          </UnpublishedNotice>
        )}

        {!published && isAdmin && (
          <p>
            <strong>Не опубликовано!</strong>
          </p>
        )}
        <QuestionHeader>
          <Meta title={author || "Анонимно"} Icon={User}>
            <p>
              {format(new Date(created || 0), "d MMMM y, HH:mm", {
                locale: ru,
              })}
            </p>
          </Meta>
          <div>
            <QuestionAdmin id={id} published={published} answered={answered} />
            <BadgeButton
              size="xxxs"
              active={!userCanVote}
              disabled={!userCanVote}
              onClick={() => upvote(id!)}
            >
              {votes} <ThumbsUp size={rhythm(0.6)} />
            </BadgeButton>
          </div>
        </QuestionHeader>

        <p className="question">{question}</p>
      </Panel>
    </QuestionContainer>
  )
}
