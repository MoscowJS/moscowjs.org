import { AirtableImage } from "./airtable.h"
import { EventData } from "./event.h"
import { SpeakerData } from "./speaker.h"

export type TalkData = {
  Title: string
  Speakers: Array<{ data: SpeakerData }>
  Theses?: string
  Company: string
  Meetup: Array<{ data: EventData }>
  Date: string
  Record?: string
  Slides_URL?: string
  Announce?: AirtableImage[]
}
