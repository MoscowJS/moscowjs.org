import type { Paper } from './paper.h'
import type { Meetup } from './meetup.h'
import type { Speaker } from './speaker.h'

export type Talk = {
  id: string
  slides_url?: string
  record?: string
  type: string
  publish: string
  company: string
  scene: string
  start_time?: string
  meetup_id?: Meetup
  speakers: Array<{ persons_id: Speaker }>
  paper: Paper
}
