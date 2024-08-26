import { AirtableImage } from "./airtable.h"
import { ImageSharp } from "./gatsby.h"
import { SpeakerData } from "./speaker.h"

export type OrgData = {
  Display_name: string
  Status: "current" | "former" | "volunteer"
  Photo?: {
    localFiles: ImageSharp[]
    raw: AirtableImage[]
  }
  Company: string
  Telegram: string
  Email: string
  About?: string
  Speaker: Array<{
    data: SpeakerData
  }>
}
