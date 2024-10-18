import type { Meetup } from './meetup.h'
import type { Paper } from './paper.h'
import type { Talk } from './talk.h'

export type Speaker<
  TTalk extends Partial<
    Talk<Partial<Meetup>, Partial<Speaker>, Partial<Paper>>
  > = never
> = {
  id: string
  status: string
  telegram: string
  name: string
  role: string
  phone?: string
  email?: string
  about?: string
  github?: string
  link?: string
  photo: {
    id: string
    imageFile: {
      childImageSharp: {
        fluid: {
          base64: string
          aspectRatio: number
          src: string
          srcSet: string
          sizes: string
        }
      }
    }
  } | null
  talks: Array<{
    talks_id: TTalk
  }>
}
