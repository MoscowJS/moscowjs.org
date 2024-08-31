import type { Talk } from './talk.h'

export type Meetup = {
  id: string
  title: string
  type: string
  date_start: string
  date_end: string
  address: string
  status: string
  title_formatted: string
  registration_link: string
  announcement_short: string
  announcement_long: string
  slug: string
  stream_link: string
  video_link: string
  timetable: boolean
  talks: Array<Talk>
  venue_id: {
    id: string
    name: string
    slug: string
  }
  companies: Array<{
    companies_id: {
      id: string
      name: string
      slug: string
    }
  }>
  partners: Array<{
    partners_id: {
      id: string
      name: string
      link: string
      description: string
    }
  }>
}
