'use strict';

const airtableClient = require('./airtable.client');

function normalize(record, { venuesMap }) {
  const venuesValue = Array.isArray(record.get('Venues')) ? record.get('Venues') : [];
  const venues = venuesValue
    .filter((venue) => venuesMap.has(venue))
    .map((venue) => venuesMap.get(venue));

  return {
    id: record.getId(),
    slug: record.get('Slug'),
    name: record.get('Name'),
    venues,
  };
}

function loadCompanies(maps) {
  return airtableClient('Companies')
    .select({
      fields: ['Slug', 'Name', 'Venues'],
    })
    .all()
    .then((companies) => {
      const map = new Map();

      const records = companies.map((company) => {
        const record = normalize(company, maps);
        map.set(record.id, record);
        return record;
      });

      return { records, map };
    });
}

module.exports = { loadCompanies };
