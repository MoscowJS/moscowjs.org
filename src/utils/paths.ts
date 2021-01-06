import slugify from "slugify"

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
