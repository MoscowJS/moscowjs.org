import React, { FunctionComponent, useContext, useState } from 'react'
import { useTabState, Tab, TabList, TabPanel } from 'reakit/Tab'
import styled from 'styled-components'

import { rhythm } from '../../../utils/typography'
import { Select } from '../../../components/forms'
import { SessionContext } from '../sessionContext'
import { QuestionForm } from '../questionForm'
import { QuestionsList } from '../questionsList'
import { useIsAdmin } from '../hooks/useIsAdmin'
import { useQnaList } from '../hooks/useQnaList'

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

  &[aria-selected='true'] {
    background-color: var(--color-primary);
    color: #000;
  }
`

const QnaAsyncContainer: FunctionComponent = () => {
  const [list, allTalks, loading] = useQnaList()
  const tab = useTabState()
  const isAdmin = useIsAdmin()
  const sessionId = useContext(SessionContext)
  const [selectedTalk, selectTalk] = useState('Все вопросы')
  const handleTalkChange = (event: any) => {
    selectTalk(event.target.value)
  }

  if (!sessionId) {
    return <p>В настоящий момент вопросы не принимаются.</p>
  }

  if (selectedTalk !== 'Все вопросы') {
    list.answered = list.answered.filter(
      question => question.talk === selectedTalk
    )
    list.published = list.published.filter(
      question => question.talk === selectedTalk
    )
  }

  return (
    <>
      <QuestionForm />
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <p>
            <Select
              aria-placeholder={'Фильтр вопросов'}
              onChange={handleTalkChange}
            >
              <option>Все вопросы</option>
              {allTalks.map(talk => (
                <option key={talk.title} id={talk.title}>
                  {talk.title}, {talk.speaker}
                </option>
              ))}
            </Select>
          </p>
          <QnaTabList {...tab} aria-label="Вкладки с вопросами">
            <QnaTab {...tab}>Вопросы</QnaTab>
            {list.answered.length ? <QnaTab {...tab}>Отвеченные</QnaTab> : null}
          </QnaTabList>
          <TabPanel {...tab}>
            {list.unpublished.length ? (
              <>
                <h4>На модерации</h4>
                <QuestionsList questions={list.unpublished} />
                <hr />
              </>
            ) : null}
            <QuestionsList questions={list.published} />
          </TabPanel>
          {list.answered.length ? (
            <TabPanel {...tab}>
              <QuestionsList questions={list.answered} />
            </TabPanel>
          ) : null}
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
