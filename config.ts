if (typeof process.env['GATSBY_SRC_ROOT'] !== 'string') {
  throw new Error('ENV GATSBY_SRC_ROOT is required')
}
if (typeof process.env['SITE_URL'] !== 'string') {
  throw new Error('ENV SITE_URL is required')
}
if (
  typeof process.env['GATSBY_DATASOURCE'] !== 'string' ||
  !['directus'].includes(process.env['GATSBY_DATASOURCE'])
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
    directus: {
      ...config.directus,
      token: obfuscateString(config.directus.token, 10),
    },
  }
  console.log('config: ', JSON.stringify(obfuscatedConfig, null, 2))
}
