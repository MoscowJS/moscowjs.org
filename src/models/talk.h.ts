import type { Paper } from './paper.h'
import type { Meetup } from './meetup.h'
import type { Speaker } from './speaker.h'

export type Talk<
  TMeetup extends Partial<Meetup> = never,
  TSpeaker extends Partial<Speaker> = never,
  TPaper extends Partial<Paper> = never
> = {
  id: string
  slides_url?: string
  record?: string
  type: string
  publish: string
  company: string
  scene: string
  start_time?: string
  meetup_id: TMeetup
  speakers: Array<{ persons_id: TSpeaker }>
  paper: TPaper
}
