import { AirtableImage, EventData, ImageSharp } from "models"

export type PartnersData = {
  Name: string
  Link: string
  Description?: string
  Logo?: {
    localFiles: ImageSharp[]
    raw: AirtableImage[]
  }
  Meetups?: Array<{ data: EventData }>
}
