import { AirtableImage } from "./airtable.h"
import { EventData } from "./event.h"
import { VenueData } from "./venue.h"

export type CompanyData = {
  Name: string
  Slug: string
  About: string
  Logo: AirtableImage[]
  Meetups: Array<{ data: EventData }>
  Venues: Array<{ data: VenueData }>
}
