import { AirtableImage } from "./airtable.h"
import { CompanyData } from "./company.h"
import { PartnersData } from "./partners.h"
import { TalkData } from "./talk.h"
import { VenueData } from "./venue.h"

export type EventData = {
  Address?: string
  Company?: Array<{ data: CompanyData }>
  Completed: boolean
  Date: string
  DateEnd: string
  Formatted_title?: string
  Logo?: AirtableImage[]
  Long_Announcement: string
  Registration_link?: string
  Short_Announcement: string
  Slug: string
  Stream_link?: string
  Talks?: Array<{ data: TalkData }>
  Timetable?: boolean
  Title: string
  Type: string
  Video_link?: string
  Venue?: { data: VenueData }
  Partners: Array<{ data: PartnersData }>
}
