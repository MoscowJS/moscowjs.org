import { AirtableImage } from "./airtable.h"
import { CompanyData } from "./company.h"
import { EventData } from "./event.h"

export type VenueData = {
  Name: string
  Address: string
  Subway: string[]
  Address_notes: string
  Map: AirtableImage[]
  Meetups: Array<{ data: EventData }>
  Companies: Array<{ data: CompanyData }>
}
