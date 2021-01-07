import { AirtableImage } from "./airtable.h"

export type OrgData = {
  Display_name: string
  Photo?: AirtableImage[]
  Company: string[]
  Telegram: string[]
  Email: string[]
  About?: string[]
}
