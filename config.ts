if (typeof process.env['AIRTABLE_API_KEY'] !== 'string') {
  throw new Error('ENV AIRTABLE_API_KEY is required');
}
if (typeof process.env['AIRTABLE_BASE_ID'] !== 'string') {
  throw new Error('ENV AIRTABLE_BASE_ID is required');
}
if (typeof process.env['AIRTABLE_META_BASE_ID'] !== 'string') {
  throw new Error('ENV AIRTABLE_META_BASE_ID is required');
}
if (typeof process.env['GATSBY_SRC_ROOT'] !== 'string') {
  throw new Error('ENV GATSBY_SRC_ROOT is required');
}
if (typeof process.env['SITE_URL'] !== 'string') {
  throw new Error('ENV SITE_URL is required');
}

export const config = {
  airtable: {
    apiKey: process.env['AIRTABLE_API_KEY'],
    baseId: process.env['AIRTABLE_BASE_ID'],
    metaBaseId: process.env['AIRTABLE_META_BASE_ID'],
  },
  gatsby: {
    src: process.env['GATSBY_SRC_ROOT'],
    siteUrl: process.env['SITE_URL'],
  },
};
