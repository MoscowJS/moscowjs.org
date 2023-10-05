import React, {
  FormEventHandler,
  FunctionComponent,
  useRef,
  useState,
} from "react"
import { Textarea, Input, Button, Select } from "components/forms"
import { Modal } from "components/layout"
import styled from "styled-components"
import { rhythm } from "utils/typography"
import { useDialogState, DialogDisclosure } from "reakit/Dialog"
import { useAdd } from "features/qna"

const allTalks = [
  {
    title: "useSelector в Redux. Вытаскиваем стрелу из колена",
    speaker: "Вячеслав Завьялов",
    timeEnd: 1696532400000,
  },
  {
    title: "Как настроить ci/cd на github-actions и масштабировать это на другие проекты",
    speaker: "Алексей Николаев",
    timeEnd: 1696532400000,
  },
  {
    title: "Если ваш фронтендер перестал бояться IE6, покажите ему Smart TV",
    speaker: "Елена Жукова",
    timeEnd: 1696532400000,
  },
  {
    title: "Как вклад в команду помогает расти тебе",
    speaker: "Александра Моисеева",
    timeEnd: 1696532400000,
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

    formData.forEach((value, name) => (result[name] = value || ""))
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
      <DialogDisclosure {...dialog}>
        {disclosureProps => (
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
            <Select id="talk" placeholder={"Доклад"} name="talk" required>
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
