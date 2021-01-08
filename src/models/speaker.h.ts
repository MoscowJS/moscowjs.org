import { AirtableImage } from "./airtable.h"
import { EventData } from "./event.h"
import { ImageSharp } from "./gatsby.h"
import { TalkData } from "./talk.h"

export type SpeakerData = {
  Name: string
  Photo?: {
    localFiles: ImageSharp[]
    raw: AirtableImage[]
  }
  Company: string
  About: string
  Email: string
  Talks?: Array<{ data: TalkData }>
  Telegram: string
  Personal_link: string
  Github___Bitbucket: string
  Twitter: string
  Meetup: Array<{ data: EventData }>
}
