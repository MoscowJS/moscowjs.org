import React, { useState, type FunctionComponent } from 'react'
import styled from 'styled-components'

import { Button, CheckboxToggle, Input, Textarea } from '../../components/forms'

const YellowStar = styled.sup`
  color: var(--color-primary);
`

const CfpAsyncContainer: FunctionComponent = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    contacts: '',
    title: '',
    theses: '',
    message: '',
    accept: 'false',
  })
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleCheckboxChange = () => {
    setIsChecked(prevState => !prevState)
    setFormData(prev => ({ ...prev, accept: isChecked ? 'false' : 'true' }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTextareaChange = (
    e: React.SyntheticEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.accept) {
      setSubmitStatus({
        success: false,
        message: 'Необходимо согласиться с правилами поведения MoscowJS',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('https://bff.moscowjs.org/api/v1/cfp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message:
            'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
        })
        setFormData({
          name: '',
          contacts: '',
          title: '',
          theses: '',
          message: '',
          accept: 'false',
        })
        setIsChecked(false)
      } else {
        const errorData = await response.json().catch(() => null)
        setSubmitStatus({
          success: false,
          message:
            errorData?.message ||
            'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h2>Call for Papers</h2>
      <form role="form" onSubmit={handleSubmit}>
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
            value={formData.name}
            onChange={handleInputChange}
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
            value={formData.contacts}
            onChange={handleInputChange}
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
            value={formData.title}
            onChange={handleInputChange}
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
            value={formData.theses}
            onChange={handleTextareaChange}
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
            value={formData.message}
            onChange={handleTextareaChange}
          />
        </p>

        <p>
          <label htmlFor="cfp-accept">
            Отправляя эту заявку я соглашаюсь с Правилами поведения MoscowJS
            <YellowStar> *</YellowStar>
          </label>
          <br />
          <CheckboxToggle
            checked={isChecked}
            onChange={handleCheckboxChange}
            required={true}
            name="accept"
            id="cfp-accept"
          />
        </p>

        <p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправляется...' : 'Отправить'}
          </Button>
        </p>

        {submitStatus && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '4px',
              backgroundColor: submitStatus.success ? '#d4edda' : '#f8d7da',
              color: submitStatus.success ? '#155724' : '#721c24',
              border: `1px solid ${
                submitStatus.success ? '#c3e6cb' : '#f5c6cb'
              }`,
            }}
          >
            {submitStatus.message}
          </div>
        )}
      </form>
    </>
  )
}

export default CfpAsyncContainer
