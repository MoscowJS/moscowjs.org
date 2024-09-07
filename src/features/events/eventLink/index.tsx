import React, { FunctionComponent } from 'react'
import { Link } from 'gatsby'

import type { Meetup } from '../../../models'
import { eventPath } from '../../../utils/paths'
import { Markdown } from '../../../components/layout'

export const EventLink: FunctionComponent<{ event: Meetup }> = ({ event }) => {
  const path = eventPath(event.slug)

  return event.title_formatted ? (
    <Link key="title" to={path}>
      <Markdown>{event.title_formatted}</Markdown>
    </Link>
  ) : (
    <Link to={path}>{event.title}</Link>
  )
}
