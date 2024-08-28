import { charMap } from './charMap'

const slugify = (path: string) =>
  path
    .normalize()
    .trim()
    .toLowerCase()
    .split('')
    .map(char => charMap[char] || char)
    .join('')
    .replace(/[^A-Za-z0-9\s\-]/g, '')
    .replace(/\s+/g, '-')

export const eventPath = (slug: string) => {
  if (typeof slug !== 'string') {
    console.error('slug is not a string', slug)
    slug = '404-invalid-slug'
  }

  return `/events/${slugify(slug)}/`.toLowerCase()
}

export const pagePath = (slug: string) => {
  if (typeof slug !== 'string') {
    console.error('slug is not a string', slug)
    slug = '404-invalid-slug'
  }

  return `/${slug
    .split('/')
    .filter(p => p)
    .map(p => slugify(p))
    .join('/')}/`.toLowerCase()
}

export const speakerPath = (name: string) => {
  if (typeof name !== 'string') {
    console.error('name is not a string', name)
    name = '404-invalid-name'
  }

  return `/speakers/${slugify(name)}/`.toLowerCase()
}

export const talkPath = (title: string) => {
  if (typeof title !== 'string') {
    console.error('title is not a string', title)
    title = '404-invalid-title'
  }

  return `/talks/${slugify(title)}/`.toLowerCase()
}
