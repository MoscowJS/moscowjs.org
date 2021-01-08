import { AirtableImage } from "./airtable.h"
import { SpeakerData } from "./speaker.h"

export type OrgData = {
  Display_name: string
  Photo?: AirtableImage[]
  Company: string[]
  Telegram: string[]
  Email: string[]
  About?: string[]
  Speaker: Array<{
    data: SpeakerData
  }>
}
