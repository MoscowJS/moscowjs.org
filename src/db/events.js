'use strict';

const airtableClient = require('./airtable.client');

function normalize(record, { companiesMap }) {
  const companies = record.get('Company');
  const company =
    Array.isArray(companies) && companies.length && companiesMap.has(companies[0])
      ? companiesMap.get(companies[0])
      : '';
  return {
    id: record.getId(),
    slug: record.get('Slug'),
    title: record.get('Title'),
    company,
    date: record.get('Date'),
  };
}

function loadEvents({ companiesMap }) {
  return airtableClient('Meetups')
    .select({
      fields: ['Slug', 'Title', 'Company', 'Date'],
      filterByFormula: 'OR({Статус} = "Подготовка", {Статус} = "Завершен")',
      sort: [{ field: 'Date', direction: 'desc' }],
    })
    .all()
    .then((events) => {
      const map = new Map();

      const records = events.map((event) => {
        const record = normalize(event, { companiesMap });
        map.set(record.id, record);
        return record;
      });

      return { records, map };
    });
}

module.exports = { loadEvents };
