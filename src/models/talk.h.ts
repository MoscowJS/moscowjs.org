import { AirtableImage } from "./airtable.h"
import { EventData } from "./event.h"
import { SpeakerData } from "./speaker.h"

export type TalkData = {
  Title: string
  Speakers: Array<{ data: SpeakerData }>
  Theses: string
  Company: string
  Meetup: { data: EventData }
  Date: string
  Announce: AirtableImage[]
}
