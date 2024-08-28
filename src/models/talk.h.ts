import type { Meetup } from './meetup.h'
import type { Speaker } from './speaker.h'

export type Talk = {
  id: string
  status: string
  title: string
  slides_url?: string
  record?: string
  type: string
  theses: string
  publish: string
  company: string
  scene: string
  meetup_id?: Meetup
  speakers: Array<Speaker>
}
