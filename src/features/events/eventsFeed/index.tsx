import React, { type FunctionComponent } from 'react'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'

import type { Meetup } from '../../../models'
import { Item, Markdown } from '../../../components/layout'
import { airtableDateFix } from '../../../utils/airtableDateFix'
import { EventLogo } from '../eventLogo'
import { EventLink } from '../eventLink'

const formatDate = (date: string) =>
  format(airtableDateFix(new Date(date)), 'd MMMM y, HH:mm', {
    locale: ru,
  })

export const EventsFeed: FunctionComponent<{
  events: Array<Meetup>
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
              {Array.isArray(meetup.companies) && (
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
