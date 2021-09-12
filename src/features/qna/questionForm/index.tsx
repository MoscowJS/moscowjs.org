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
    title: "Frontend «Платформа» или как всем понравиться",
    speaker: "Константин Лебедев",
    timeEnd: 1631350800012,
  },
  {
    title: "Для чего нужен Deno и что значит быть Deno-разработчиком",
    speaker: "Рустам Имайкин",
    timeEnd: 1631350800012,
  },
  {
    title: "Конечный автомат на React Hooks и Typescript	Сергей Володин",
    speaker: "Сергей Володин",
    timeEnd: 1631353800012,
  },
  {
    title: "Ошибки хороших руководителей",
    speaker: "Наталья Ёркина",
    timeEnd: 1631353800012,
  },
  {
    title:
      "Tramvai - новый модульный фреймворк с DI для SSR приложений на React от Tinkoff",
    speaker: "Андрей Марченко",
    timeEnd: 1631356800012,
  },
  {
    title:
      "Тестируем подходы к тестированию. Личные грабли при написании тестов",
    speaker: "Алексей Золотых",
    timeEnd: 1631356800012,
  },
  {
    title: "Как бороться с багами без боли и агрессии",
    speaker: "Алексей Попков",
    timeEnd: 1631363400012,
  },
  {
    title: "А дальше-то что?",
    speaker: "Зарема Халилова",
    timeEnd: 1631363400012,
  },
  {
    title: "Меняем стул под пользователем",
    speaker: "Александр Коротаев",
    timeEnd: 1631366400012,
  },
  {
    title: "Магия прототипного наследования",
    speaker: "Виктор Вершанский",
    timeEnd: 1631366400012,
  },
  {
    title: "TC39 Demystified",
    speaker: "Ujjwal Sharma",
    timeEnd: 1631369400012,
  },
  {
    title: "Review Code Review",
    speaker: "Максим Соснов",
    timeEnd: 1631369400012,
  },
  {
    title:
      "Библиотека как продукт: от папки в проекте до международного опенсорса",
    speaker: "Роман Седов",
    timeEnd: 1631372400012,
  },
  {
    title: "Как найти работу, которой захочется гордиться",
    speaker: "Андрей Сёмин",
    timeEnd: 1631372400012,
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
