import React, { FunctionComponent } from "react"
import { QuestionForm, QuestionsList, useQnaList } from "features/qna"

const QnaPage: FunctionComponent = () => {
  const [list, loading, actions] = useQnaList()

  return (
    <>
      <QuestionForm onSubmit={actions.add} />
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <QuestionsList upvote={actions.upvote} questions={list} />
      )}
    </>
  )
}


export default QnaPage
