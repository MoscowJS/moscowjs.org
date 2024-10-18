import React, { type FunctionComponent } from 'react'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'

import type { Company, Meetup } from '../../../models'
import { Item, Markdown } from '../../../components/layout'
import { EventLogo } from '../eventLogo'
import { EventLink } from '../eventLink'

const formatDate = (date: string) =>
  format(new Date(date), 'd MMMM y, HH:mm', {
    locale: ru,
  })

export const EventsFeed: FunctionComponent<{
  events: Array<
    Pick<
      Meetup<never, never, Company, never>,
      | 'id'
      | 'slug'
      | 'title'
      | 'date_start'
      | 'announcement_short'
      | 'companies'
    >
  >
}> = ({ events }) => {
  return (
    <>
      {events.map(meetup => (
        <Item key={meetup.slug}>
          <Item.ImageContainer size="s">
            <EventLogo size="s" title={meetup.title} />
          </Item.ImageContainer>
          <Item.Content>
            <Item.Meta>
              <time dateTime={formatDate(meetup.date_start)}>
                {formatDate(meetup.date_start)}
              </time>
              {Boolean(meetup.companies?.length) && (
                <>
                  {' '}
                  (
                  <em>
                    {meetup.companies
                      .map(({ companies_id: company }) => company.name)
                      .join(', ')}
                  </em>
                  )
                </>
              )}
            </Item.Meta>
            <Item.Header>
              <EventLink event={meetup} />
            </Item.Header>
            {meetup.announcement_short && (
              <div>
                <Markdown>{meetup.announcement_short}</Markdown>
              </div>
            )}
          </Item.Content>
        </Item>
      ))}
    </>
  )
}
