import React, { FunctionComponent } from "react"
import { QuestionForm, QuestionsList, useQnaList } from "features/qna"

const QnaAsyncContainer: FunctionComponent = () => {
  const [list, loading] = useQnaList()

  return (
    <>
      <QuestionForm />
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <QuestionsList questions={list} />
      )}
    </>
  )
}

export default QnaAsyncContainer
