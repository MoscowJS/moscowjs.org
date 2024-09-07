import { Meetup } from './meetup.h'

export type Partner = {
  name: string
  link: string
  description?: string
  meetups: Array<Meetup>
}
