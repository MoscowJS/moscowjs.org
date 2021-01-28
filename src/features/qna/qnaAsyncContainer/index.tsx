import React, { FunctionComponent } from "react"
import {
  QuestionForm,
  QuestionsList,
  useIsAdmin,
  useQnaList,
} from "features/qna"
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab"
import styled from "styled-components"
import { rhythm } from "utils/typography"

const QnaTabList = styled(TabList)`
  border-bottom: 5px solid var(--color-primary);
  margin-bottom: ${rhythm(1)};
`

const QnaTab = styled(Tab)`
  color: var(--color-text);
  background: none;
  border: none;
  padding: 0 ${rhythm(0.5)};
  line-height: ${rhythm(2)};

  &[aria-selected="true"] {
    background-color: var(--color-primary);
    color: #000;
  }
`

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
          <QnaTabList {...tab} aria-label="My tabs">
            <QnaTab {...tab}>Вопросы</QnaTab>
            <QnaTab {...tab}>Отвеченные</QnaTab>
          </QnaTabList>
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
