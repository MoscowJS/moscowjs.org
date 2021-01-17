import React, { FunctionComponent, useState } from "react"
import SEO from "utils/seo"
import styled from "styled-components"
import { Button, Input, Textarea } from "components/forms"
import { Container, Footer, Header, Markdown, Modal } from "components/layout"
import { graphql, PageProps } from "gatsby"
import { PagesData } from "models"
import { QuestionsList, useQnaList } from "features/qna"
import { rhythm } from "utils/typography"

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

const Page: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
  }>
> = ({ data, location }) => {
  const [initialLoading, list] = useQnaList()
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>
        {/* <button onClick={toggleModal}>Добавить свой вопрос</button> */}

        <FakeTextarea onClick={toggleModal}>Добавь свой вопрос</FakeTextarea>

        <Modal open={isOpen} onClose={toggleModal} center>
          <form>
            <p>
              <Textarea
                css={`
                  width: 100%;
                `}
                rows={1}
                required={true}
                placeholder="Твой вопрос"
                name="question"
              />
            </p>

            <p>
              <Input
                css={`
                  width: 100%;
                `}
                name="name"
                placeholder="Имя (необязательно)"
              />
            </p>

            <p>
              <Input
                css={`
                  width: 100%;
                `}
                name="contacts"
                placeholder="Контакты (необязательно)"
              />
            </p>

            <p>
              <small>
                Контактные данные не публикуются и используются для связи с
                авторами лучших вопросов
              </small>
            </p>

            <p>
              <Button type="submit">Отправить</Button>
            </p>
          </form>
        </Modal>
        {initialLoading ? "Загрузка..." : <QuestionsList questions={list} />}
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    airtablepages(id: { eq: $id }) {
      data {
        title
        slug
        content
        description
      }
    }
  }
`

export default Page
