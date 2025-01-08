import React, { type FunctionComponent } from 'react'
import styled from 'styled-components'

import { Button, CheckboxToggle, Input, Textarea } from '../../components/forms'

const YellowStar = styled.sup`
  color: var(--color-primary);
`

const CfpAsyncContainer: FunctionComponent = () => {
  return (
    <>
      <h2>Call for Papers</h2>
      <form role="form" action="bff.moscowjs.org/api/v1/cfp" method="POST">
        <p>
          <label htmlFor="cfp-name">
            Как к тебе обращаться? <YellowStar>*</YellowStar>
          </label>
          <Input
            css={`
              width: 100%;
            `}
            required={true}
            name="name"
            id="cfp-name"
            placeholder="My Name Is"
          />
        </p>

        <p>
          <label htmlFor="cfp-contacts">
            Как с тобой лучше связаться? <YellowStar>*</YellowStar>
          </label>
          <p>
            <small>
              Укажите удобный для тебя вид связи. Например, @my-telegram-id
            </small>
          </p>
          <Input
            css={`
              width: 100%;
            `}
            required={true}
            name="contacts"
            id="cfp-contacts"
            placeholder="@my-telegram-id"
          />
        </p>

        <p>
          <label htmlFor="cfp-title">
            Название доклада <YellowStar>*</YellowStar>
          </label>
          <Input
            css={`
              width: 100%;
            `}
            required={true}
            name="title"
            id="cfp-title"
            placeholder="My awesome speech"
          />
        </p>

        <p>
          <label htmlFor="cfp-theses">
            О чем будешь рассказывать? <YellowStar>*</YellowStar>
          </label>
          <p>
            <small>
              Напиши основные тезисы или идею твоего доклада. Всего пара-тройка
              предложений, но организаторам будет намного понятней.
            </small>
          </p>
          <Textarea
            css={`
              width: 100%;
            `}
            required={true}
            rows={3}
            name="theses"
            placeholder="Theses #1 ..."
          />
        </p>

        <p>
          <label htmlFor="cfp-message">Дополнительная информация</label>
          <p>
            <small>
              Любая информация, которой ты хотел бы поделиться с организаторами.
            </small>
          </p>
          <Textarea
            css={`
              width: 100%;
            `}
            rows={3}
            name="message"
            placeholder="Extra information ..."
          />
        </p>

        <p>
          <label htmlFor="cfp-accept">
            Отправляя эту заявку я соглашаюсь с Правилами поведения MoscowJS
            <YellowStar> *</YellowStar>
          </label>
          <br />
          <CheckboxToggle
            checked={false}
            required={true}
            name="accept"
            id="cfp-accept"
          />
        </p>

        <p>
          <Button type="submit">Отправить</Button>
        </p>
      </form>
    </>
  )
}

export default CfpAsyncContainer
