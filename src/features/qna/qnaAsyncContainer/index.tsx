import React, { FunctionComponent } from "react"
import {
  QuestionForm,
  QuestionsList,
  useIsAdmin,
  useQnaList,
} from "features/qna"
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab"

const QnaAsyncContainer: FunctionComponent = () => {
  const [list, loading] = useQnaList()
  const tab = useTabState()
  const isAdmin = useIsAdmin()

  return (
    <>
      <QuestionForm />
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <TabList {...tab} aria-label="My tabs">
            <Tab {...tab}>Вопросы</Tab>
            <Tab {...tab}>Отвеченные</Tab>
          </TabList>
          <TabPanel {...tab}>
            <QuestionsList
              questions={list.unpublished.concat(list.published)}
            />
          </TabPanel>
          <TabPanel {...tab}>
            <QuestionsList questions={list.answered} />
          </TabPanel>
        </>
      )}
      {isAdmin && (
        <p>
          <strong>Ура, ты админ!</strong>
        </p>
      )}
    </>
  )
}

export default QnaAsyncContainer
