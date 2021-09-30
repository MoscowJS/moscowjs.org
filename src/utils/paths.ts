import slugify from "slugify"

const strictSlugify = (path: string) => slugify(path, {
  remove: /[?*+~.()'"!:@ьъ\/]/g
})

export const eventPath = (slug: string) =>
  `/events/${strictSlugify(slug)}/`.toLowerCase()

export const pagePath = (slug: string) =>
  `/${slug
    .split("/")
    .filter(p => p)
    .map(p => strictSlugify(p))
    .join("/")}/`.toLowerCase()

export const speakerPath = (name: string) =>
  `/speakers/${strictSlugify(name)}/`.toLowerCase()

export const talkPath = (title: string) =>
  `/talks/${strictSlugify(title)}/`.toLowerCase()
