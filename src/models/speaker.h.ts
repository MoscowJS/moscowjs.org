import type { Talk } from './talk.h'

export type Speaker = {
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
  photo?: Record<string, unknown>
  talks?: Array<{
    talks_id: Talk
  }>
}
