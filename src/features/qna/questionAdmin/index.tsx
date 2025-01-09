import React, { FunctionComponent, useCallback } from 'react'

import { BadgeButton } from '../../../components/elements'
import type { QuestionData } from '../../../models'
import { useAdminActions } from '../hooks/useAdminActions'
import { useIsAdmin } from '../hooks/useIsAdmin'

const useConfirm = (fn: Function, message: string) => {
  return useCallback(() => {
    const result = confirm(message)
    if (result) {
      fn()
    }
  }, [fn, message])
}

export const QuestionAdmin: FunctionComponent<QuestionData> = ({
  id,
  published,
  answered,
}) => {
  const isAdmin = useIsAdmin()
  const { remove, publish, setAnswered } = useAdminActions(id!)

  const removeConfirm = useConfirm(remove, 'Точно удалить?')
  const publishConfirm = useConfirm(publish, 'Точно опубликовать?')
  const answeredConfirm = useConfirm(
    setAnswered,
    'Точно пометить, как отвеченный?'
  )

  if (!isAdmin) {
    return null
  }
  return (
    <>
      <BadgeButton size="xxxs" title="Удалить" onClick={removeConfirm}>
        Удалить
      </BadgeButton>
      {!published && (
        <BadgeButton size="xxxs" title="Опубликовать" onClick={publishConfirm}>
          Опубликовать
        </BadgeButton>
      )}
      {published && !answered && (
        <BadgeButton
          size="xxxs"
          title="Пометить как отвеченное"
          onClick={answeredConfirm}
        >
          Отвечено
        </BadgeButton>
      )}
    </>
  )
}
