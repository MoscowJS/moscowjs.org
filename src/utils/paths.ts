import { charMap } from './charMap.js'

const slugify = (path: string) => path
  .normalize()
  .trim()
  .toLowerCase()
  .split('')
  .map(char => (charMap[char] || char))
  .join('')
  .replace(/[^A-Za-z\s\-]/g, '')
  .replace(/\s+/g, '-')

export const eventPath = (slug: string) =>
  `/events/${slugify(slug)}/`.toLowerCase()

export const pagePath = (slug: string) =>
  `/${slug
    .split("/")
    .filter(p => p)
    .map(p => slugify(p))
    .join("/")}/`.toLowerCase()

export const speakerPath = (name: string) =>
  `/speakers/${slugify(name)}/`.toLowerCase()

export const talkPath = (title: string) =>
  `/talks/${slugify(title)}/`.toLowerCase()
