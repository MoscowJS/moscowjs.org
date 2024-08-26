import React, { FunctionComponent } from "react"
import { EventData } from "models"
import { eventPath } from "utils/paths"
import { Link } from "gatsby"
import { Markdown } from "components/layout"

export const EventLink: FunctionComponent<{ event: EventData }> = ({
  event,
}) => {
  const path = eventPath(event.Slug)

  return event.Formatted_title ? (
    <Link key="title" to={path}>
      <Markdown>{event.Formatted_title}</Markdown>
    </Link>
  ) : (
    <Link to={path}>{event.Title}</Link>
  )
}
