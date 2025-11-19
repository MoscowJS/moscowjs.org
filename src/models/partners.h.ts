import { Meetup } from './meetup.h'

export type Partner<TMeetup extends Partial<Meetup> = never> = {
  id: string
  name: string
  link: string
  description?: string
  meetups: Array<TMeetup>
}
