import React, { FormEventHandler, FunctionComponent, SyntheticEvent, useRef, useState } from 'react'
import { Textarea, Input, Button } from "components/forms";
import {
  useDialogState,
  DialogDisclosure,
} from "reakit/Dialog";
import { Modal } from 'components/layout'
import styled from "styled-components";
import { rhythm } from "utils/typography";

const FakeTextarea = styled.button`
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
}
export const QuestionForm: FunctionComponent<{
  onSubmit: (data: QuestionFormData) => Promise<void>
}> = ({ onSubmit }) => {
  const [disabled, setDisabled] = useState(false)
  const dialog = useDialogState()
  const form = useRef(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setDisabled(true)

    const formData = new FormData(event.currentTarget)
    const result: any = {}

    formData.forEach((value, name) => result[name] = value || '')
    event.currentTarget.reset()

    onSubmit(result)
      .then(() => {
        if (form.current) {
          setDisabled(false)
        }
      })
  }

  return <>
  <Modal disclosure={<FakeTextarea>Добавь свой вопрос</FakeTextarea>}>
    <form ref={form} action="/" onSubmit={handleSubmit}>
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
        <Button type="submit" disabled={disabled}>Отправить</Button>
      </p>
    </form>
  </Modal>
  </>
}
