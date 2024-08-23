if (typeof process.env['AIRTABLE_API_KEY'] !== 'string') {
  throw new Error('ENV AIRTABLE_API_KEY is required')
}
if (typeof process.env['AIRTABLE_BASE_ID'] !== 'string') {
  throw new Error('ENV AIRTABLE_BASE_ID is required')
}
if (typeof process.env['AIRTABLE_META_BASE_ID'] !== 'string') {
  throw new Error('ENV AIRTABLE_META_BASE_ID is required')
}
if (typeof process.env['GATSBY_SRC_ROOT'] !== 'string') {
  throw new Error('ENV GATSBY_SRC_ROOT is required')
}
if (typeof process.env['SITE_URL'] !== 'string') {
  throw new Error('ENV SITE_URL is required')
}
if (
  typeof process.env['GATSBY_DATASOURCE'] !== 'string' ||
  ['airtable', 'directus'].includes(process.env['GATSBY_DATASOURCE'])
) {
  throw new Error('ENV GATSBY_DATASOURCE invalid')
}
if (typeof process.env['DIRECTUS_URL'] !== 'string') {
  throw new Error('ENV DIRECTUS_URL is required')
}
if (typeof process.env['DIRECTUS_EMAIL'] !== 'string') {
  throw new Error('ENV DIRECTUS_EMAIL is required')
}
if (typeof process.env['DIRECTUS_PASSWORD'] !== 'string') {
  throw new Error('ENV DIRECTUS_PASSWORD is required')
}

export const config = {
  airtable: {
    apiKey: process.env['AIRTABLE_API_KEY'],
    baseId: process.env['AIRTABLE_BASE_ID'],
    metaBaseId: process.env['AIRTABLE_META_BASE_ID'],
  },
  directus: {
    url: process.env['DIRECTUS_URL'],
    email: process.env['DIRECTUS_EMAIL'],
    password: process.env['DIRECTUS_PASSWORD'],
  },
  gatsby: {
    src: process.env['GATSBY_SRC_ROOT'],
    siteUrl: process.env['SITE_URL'],
    datasource: process.env['GATSBY_DATASOURCE'],
  },
}
