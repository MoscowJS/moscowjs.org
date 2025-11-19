import type { Partner } from './partners.h'
import type { Talk } from './talk.h'
import type { Venue } from './venue.h'
import type { Company } from './company.h'
import type { Speaker } from './speaker.h'
import type { Paper } from './paper.h'

type MeetupStatus = 'выбор площадки' | 'завершен' | 'подготовка'
type MeetupType = 'online' | 'offline'

export type Meetup<
  TTalk extends Partial<
    Talk<Partial<Meetup>, Partial<Speaker>, Partial<Paper>>
  > = never,
  TVenue extends Partial<Venue> = never,
  TCompany extends Partial<Company> = never,
  TPartner extends Partial<Partner> = never
> = {
  id: string
  status: MeetupStatus
  publish: boolean
  type: MeetupType
  slug: string
  date_start: string
  date_end: string
  title: string
  title_formatted?: string
  address: string
  announcement_long: string
  announcement_short: string
  registration_link?: string
  video_link?: string
  stream_link?: string
  timetable: boolean
  talks: Array<TTalk>
  venue: TVenue
  companies: Array<{
    companies_id: TCompany
  }>
  partners: Array<{
    partners_id: TPartner
  }>
}
