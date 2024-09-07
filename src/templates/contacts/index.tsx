import React, { FunctionComponent } from 'react'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'
import { UserX } from 'react-feather'
import Img from 'gatsby-image'

import type {
  Page as PageType,
  Speaker,
  WrappedWithDirectus,
} from '../../models'
import {
  Container,
  Footer,
  Header,
  Item,
  Markdown,
} from '../../components/layout'
import { rhythm } from '../../utils/typography'
import SEO from '../../utils/seo'

const Grid = styled.ul`
  --item-width: ${rhythm(4)};

  margin: 0 0 ${rhythm(2)};
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--item-width));
  grid-gap: ${rhythm(0.5)};
  justify-content: space-between;
`

const GridItem = styled.li`
  display: inline-block;
  overflow: hidden;
  text-align: center;
  font-size: ${rhythm(0.5)};
  margin: 0;
`

type OrgPerson = Pick<
  Speaker,
  'name' | 'role' | 'photo' | 'about' | 'telegram' | 'email'
>

const Page: FunctionComponent<
  PageProps<
    WrappedWithDirectus<{
      pages_by_id: Pick<PageType, 'title' | 'content'>
      persons: Array<OrgPerson>
    }>
  >
> = ({ data, location }) => {
  const { pages_by_id: page, persons } = data.directus
  const orgs = persons.reduce(
    (accumulator, person) => {
      if (person.role === 'organizer') {
        accumulator.organizer.push(person)
      } else if (person.role === 'alumni_organizer') {
        accumulator.alumni.push(person)
      } else if (person.role === 'volunteer') {
        accumulator.volunteer.push(person)
      }
      return accumulator
    },
    {
      organizer: [],
      alumni: [],
      volunteer: [],
    } as Record<'organizer' | 'alumni' | 'volunteer', Array<OrgPerson>>
  )

  return (
    <>
      <SEO title={page.title} />
      <Header location={location} />
      <Container as="main">
        <Markdown>{page.content}</Markdown>

        <h3>Организаторы</h3>
        {orgs.organizer.map(data => {
          return (
            <Item key={data.name}>
              <Item.ImageContainer size="s">
                {data.photo ? (
                  <Img
                    fluid={data.photo.imageFile.childImageSharp.fluid}
                    alt={data.name}
                  />
                ) : (
                  <UserX size="100%" />
                )}
              </Item.ImageContainer>
              <Item.Content>
                <Item.Header>{data.name}</Item.Header>
                {data.about && <Markdown>{data.about}</Markdown>}
                <div>
                  telegram:{' '}
                  <a href={`https://t.me/${data.telegram}`}>
                    t.me/{data.telegram}
                  </a>
                </div>
                <div>
                  email: <a href={`mailto:${data.email}`}>{data.email}</a>
                </div>
              </Item.Content>
            </Item>
          )
        })}

        <h3>Бывшие организаторы</h3>
        <Grid>
          {orgs.alumni.map(data => (
            <GridItem key={data.name}>
              <div>
                {data.photo ? (
                  <Img
                    fluid={data.photo.imageFile.childImageSharp.fluid}
                    alt={data.name}
                  />
                ) : (
                  <div
                    css={`
                      line-height: 0;
                    `}
                  >
                    <UserX size="100%" />
                  </div>
                )}
                <p
                  css={`
                    text-align: center;
                    font-size: ${rhythm(0.4)};
                  `}
                >
                  {data.name}
                </p>
              </div>
            </GridItem>
          ))}
        </Grid>

        <h3>Волонтеры</h3>
        <ul>
          {orgs.volunteer.map(data => (
            <li>{data.name}</li>
          ))}
        </ul>
      </Container>
      <Footer />
    </>
  )
}

export const query = graphql`
  query ($id: ID!) {
    directus {
      pages_by_id(id: $id) {
        title
        content
      }
      persons(
        filter: {
          role: { _in: ["organizer", "alumni_organizer", "volunteer"] }
        }
        sort: ["name"]
        limit: -1
      ) {
        id
        name
        role
        about
        email
        telegram
        photo {
          id
          imageFile {
            childImageSharp {
              fluid(
                cropFocus: CENTER
                quality: 80
                grayscale: true
                maxWidth: 150
                maxHeight: 150
                fit: COVER
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default Page
