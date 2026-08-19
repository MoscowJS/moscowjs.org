import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { User, ThumbsUp } from 'react-feather'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { Panel, Meta } from '../../../components/layout'
import { rhythm } from '../../../utils/typography'
import { useTalkContactQuestions } from '../hooks/useTalkContactQuestions'

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: block;
    margin-bottom: ${rhythm(1)};

    &:last-child {
      margin: 0;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Votes = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${rhythm(0.25)};
`

const TalkContactsList: FunctionComponent<{ talkKey: string }> = ({
  talkKey,
}) => {
  const [questions, loading] = useTalkContactQuestions(talkKey)

  if (loading) {
    return <p>Загрузка...</p>
  }

  if (!questions.length) {
    return <p>Пока нет вопросов с контактами.</p>
  }

  return (
    <ListContainer>
      {questions.map(q => (
        <li key={q.id}>
          <Panel>
            <Header>
              <Meta title={q.author || 'Анонимно'} Icon={User}>
                <p>
                  {format(new Date(q.created || 0), 'd MMMM y, HH:mm', {
                    locale: ru,
                  })}
                </p>
              </Meta>
              <Votes>
                {q.votes || 0} <ThumbsUp size={rhythm(0.6)} />
              </Votes>
            </Header>
            <p>{q.question}</p>
          </Panel>
        </li>
      ))}
    </ListContainer>
  )
}

export default TalkContactsList
