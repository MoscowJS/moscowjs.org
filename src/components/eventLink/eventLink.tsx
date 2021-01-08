import React, { FunctionComponent } from "react"
import { EventData } from "../../models/event.h"
import { eventPath } from "../../utils/paths"
import { Link } from "gatsby"

export const EventLink: FunctionComponent<{ event: EventData }> = ({
  event,
}) => {
  const path = eventPath(event.Slug)

  return event.Formatted_title ? (
    <Link
      key="title"
      to={path}
      dangerouslySetInnerHTML={{
        __html: event.Formatted_title,
      }}
    />
  ) : (
    <Link to={path}>{event.Title}</Link>
  )
}
