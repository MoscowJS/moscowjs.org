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
  !['airtable', 'directus'].includes(process.env['GATSBY_DATASOURCE'])
) {
  throw new Error('ENV GATSBY_DATASOURCE invalid')
}
if (typeof process.env['DIRECTUS_URL'] !== 'string') {
  throw new Error('ENV DIRECTUS_URL is required')
}
if (typeof process.env['DIRECTUS_TOKEN'] !== 'string') {
  throw new Error('ENV DIRECTUS_TOKEN is required')
}

export const config = {
  airtable: {
    apiKey: process.env['AIRTABLE_API_KEY'],
    baseId: process.env['AIRTABLE_BASE_ID'],
    metaBaseId: process.env['AIRTABLE_META_BASE_ID'],
  },
  directus: {
    url: process.env['DIRECTUS_URL'],
    token: process.env['DIRECTUS_TOKEN'],
  },
  gatsby: {
    src: process.env['GATSBY_SRC_ROOT'],
    siteUrl: process.env['SITE_URL'],
    datasource: process.env['GATSBY_DATASOURCE'],
  },
}

function obfuscateString(key?: string, count = 6): string | undefined {
  const obfuscateRegexp = new RegExp(`.{${count}}$`)
  return key?.replace(obfuscateRegexp, '*'.repeat(count))
}

if (
  typeof process.env['GATSBY_PRINT_CONFIG'] === 'string' &&
  process.env['GATSBY_PRINT_CONFIG'] === 'true'
) {
  const obfuscatedConfig = {
    ...config,
    airtable: {
      ...config.airtable,
      apiKey: obfuscateString(config.airtable.apiKey, 10),
    },
    directus: {
      ...config.directus,
      token: obfuscateString(config.directus.token, 10),
    },
  }
  console.log('config: ', JSON.stringify(obfuscatedConfig, null, 2))
}
