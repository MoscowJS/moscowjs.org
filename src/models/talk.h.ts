import type { Meetup } from './meetup.h'

export type Talk = {
  id: string
  title: string
  theses: string
  meetup_id: Meetup
}
