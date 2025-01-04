import React, {
  FormEventHandler,
  FunctionComponent,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { useDialogState, DialogDisclosure } from 'reakit/Dialog'

import { Textarea, Input, Button, Select } from '../../../components/forms'
import { Modal } from '../../../components/layout'
import { rhythm } from '../../../utils/typography'
import { useAdd } from '../hooks/useAdd'

const allTalks = [
  {
    title: 'Адаптируй это',
    speaker: 'Геннадий Ватитов',
    timeEnd: 1732219200000,
  },
  {
    title: '1000 и 1 способ оптимизировать медиафайлы',
    speaker: 'Денис Филипкин',
    timeEnd: 1732219200000,
  },
  {
    title: 'Идеальная команда. Какая она?',
    speaker: 'Александр Ермолов',
    timeEnd: 1732219200000,
  },
  {
    title: '1 + 1 > 2: Парное программирование в реальности',
    speaker: 'Аврора Ренард',
    timeEnd: 1732219200000,
  },
]

const FakeTextarea = styled.div`
  cursor: text;
  background: none;
  border: none;

  color: rgb(117, 117, 117);
  border-bottom: 1px solid var(--color-primary);
  width: 100%;
  margin-bottom: ${rhythm(1)};
  text-align: left;

  &:focus {
    box-shadow: var(--color-outline);
  }
`
export type QuestionFormData = {
  question: string
  author: string
  contacts: string
  talk: string
}
export const QuestionForm: FunctionComponent = () => {
  const [disabled, setDisabled] = useState(false)
  const add = useAdd()
  const form = useRef(null)
  const dialog = useDialogState({ animated: 250 })
  const talks = allTalks.filter(talk => talk.timeEnd > +new Date())

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    setDisabled(true)

    const formData = new FormData(event.currentTarget)
    const result: any = {}

    formData.forEach((value, name) => (result[name] = value || ''))
    event.currentTarget.reset()

    add &&
      add(result).then(() => {
        if (form.current) {
          setDisabled(false)
          dialog.hide()
        }
      })
  }

  if (!add) {
    return null
  }
  return (
    <>
      {/* @ts-ignore */}
      <DialogDisclosure {...dialog}>
        {disclosureProps => (
          // @ts-ignore
          <FakeTextarea {...disclosureProps}> Добавь свой вопрос</FakeTextarea>
        )}
      </DialogDisclosure>
      <Modal dialog={dialog}>
        <form role="form" ref={form} action="/" onSubmit={handleSubmit}>
          <p>
            <Textarea
              css={`
                width: 100%;
              `}
              rows={3}
              required={true}
              placeholder="Твой вопрос"
              name="question"
              disabled={disabled}
            />
          </p>

          <p>
            <label htmlFor="talk">Выбери доклад:</label>
            <Select id="talk" aria-placeholder={'Доклад'} name="talk" required>
              {talks.map(talk => (
                <option key={talk.title} id={talk.title}>
                  {talk.title}, {talk.speaker}
                </option>
              ))}
            </Select>
          </p>

          <p>
            <Input
              css={`
                width: 100%;
              `}
              name="author"
              placeholder="Имя (необязательно)"
              disabled={disabled}
            />
          </p>

          <p>
            <Input
              css={`
                width: 100%;
              `}
              name="contacts"
              placeholder="Контакты (необязательно)"
              disabled={disabled}
            />
          </p>

          <p>
            <small>
              Контактные данные не публикуются и используются для связи с
              авторами лучших вопросов
            </small>
          </p>

          <p>
            <Button type="submit" disabled={disabled}>
              Отправить
            </Button>
          </p>
        </form>
      </Modal>
    </>
  )
}
