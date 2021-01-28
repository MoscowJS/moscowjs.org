import { BadgeButton } from "components/elements"
import React, { FunctionComponent } from "react"
import { CheckCircle, Trash2, Check } from "react-feather"
import { rhythm } from "utils/typography"
import { useIsAdmin, useAdminActions } from "features/qna"
import { QuestionData } from "models"

export const QuestionAdmin: FunctionComponent<QuestionData> = ({
  id,
  published,
  answered,
}) => {
  const isAdmin = useIsAdmin()
  const { remove, publish, setAnswered } = useAdminActions(id!)

  if (!isAdmin) {
    return null
  }
  return (
    <>
      <BadgeButton size="xxxs" title="Удалить" onClick={remove}>
        <Trash2 size={rhythm(0.6)} />
      </BadgeButton>
      {!published && (
        <BadgeButton size="xxxs" title="Опубликовать" onClick={publish}>
          <CheckCircle size={rhythm(0.6)} />
        </BadgeButton>
      )}
      {!answered && (
        <BadgeButton
          size="xxxs"
          title="Пометить как отвеченное"
          onClick={setAnswered}
        >
          <Check size={rhythm(0.6)} />
        </BadgeButton>
      )}
    </>
  )
}
