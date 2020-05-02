'use strict';

const airtableClient = require('./airtable.client');

function normalize(record, maps) {
  return {
    id: record.getId(),
    slug: record.get('Slug'),
    name: record.get('Name'),
  };
}

function loadCompanies() {
  console.log('start Companies');

  return airtableClient('Companies')
    .select({
      fields: ['Slug', 'Name'],
    })
    .all()
    .then((companies) => {
      console.log('end Companies');

      const map = new Map();

      const records = companies.map((company) => {
        const record = normalize(company, {});
        map.set(record.id, record);
        return record;
      });

      return { records, map };
    });
}

module.exports = { loadCompanies };
