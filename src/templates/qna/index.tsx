import React, { FunctionComponent, useEffect, useState } from "react"
import SEO from "utils/seo"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"
import { useQnaList } from "./state/useQnaList"
import { Container, Footer, Header, Item, Markdown } from "components/layout"
import { graphql, PageProps } from "gatsby"
import { PagesData } from "models"
import { rhythm } from "utils/typography"
import { ThumbsUp } from "react-feather"

const LoaderItem = () => (
  <Item>
    <Item.ImageContainer size="xs">
      <Skeleton circle={true} height={rhythm(2)} width={rhythm(2)} />
    </Item.ImageContainer>
    <Item.Content>
      <Item.Meta>
        <Skeleton width="250px" />
      </Item.Meta>
      <Item.Header>
        <Skeleton count={2} />
      </Item.Header>
    </Item.Content>
  </Item>
)

const QuestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: ${rhythm(2)};

  li {
    display: block;
    margin-bottom: ${rhythm(1)};

    &:last-child {
      margin: 0;
    }

    &::after {
      content: "";
      display: table;
      clear: both;
    }

    p:first-of-type {
      margin: 0;
      font-size: ${rhythm(0.5)};
    }
  }
`

const VoteButton = styled.button<{
  userHasVoted: boolean
}>`
  float: right;
  display: block;
  height: ${rhythm(1.2)};
  padding: 0 5px;

  border: 2px solid
    ${({ userHasVoted }) =>
      userHasVoted ? `var(--color-links)` : `var(--color-text)`};
  border-radius: ${rhythm(1.2)};
  background: none;

  color: ${({ userHasVoted }) =>
    userHasVoted ? `var(--color-links)` : `var(--color-text)`};
  font-size: ${rhythm(0.75)};
  line-height: calc(${rhythm(1.2)} - 4px);

  cursor: pointer;

  &:hover {
    background: rgba(125, 125, 125, 0.5);
  }

  &:active {
    background: rgba(125, 125, 125, 0.8);
  }
`

const Page: FunctionComponent<
  PageProps<{
    airtablepages: { data: PagesData }
  }>
> = ({ data, location }) => {
  const [initialLoading, list] = useQnaList()

  return (
    <>
      <SEO title={data.airtablepages.data.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{data.airtablepages.data.content}</Markdown>
        {initialLoading ? (
          <LoaderItem />
        ) : (
          <QuestionsList>
            {list.map(
              ({ userHasVoted, id, votes, question, created, author }) => {
                return (
                  <li key={id}>
                    <VoteButton
                      userHasVoted={userHasVoted}
                      disabled={userHasVoted}
                    >
                      {votes} <ThumbsUp size={rhythm(0.6)} />
                    </VoteButton>
                    <p>
                      {author || "Анонимно"}, {created}
                    </p>
                    <p className="question">{question}</p>
                  </li>
                )
              }
            )}
          </QuestionsList>
        )}
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
