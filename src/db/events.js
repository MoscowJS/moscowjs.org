'use strict';

const airtableClient = require('./airtable.client');

function normalize(record, { companiesMap, venuesMap }) {
  const companies = record.get('Company');
  const venues = record.get('Venue');

  const company =
    Array.isArray(companies) && companies.length && companiesMap.has(companies[0])
      ? companiesMap.get(companies[0])
      : {};
  const venue =
    Array.isArray(venues) && venues.length && venuesMap.has(venues[0])
      ? venuesMap.get(venues[0])
      : {};

  return {
    id: record.getId(),
    slug: record.get('Slug'),
    title: record.get('Title'),
    date: record.get('Date'),
    venue,
    company,
  };
}

function loadEvents(maps) {
  return airtableClient('Meetups')
    .select({
      fields: ['Slug', 'Title', 'Company', 'Date', 'Venue'],
      filterByFormula: 'OR({Статус} = "Подготовка", {Статус} = "Завершен")',
      sort: [{ field: 'Date', direction: 'desc' }],
    })
    .all()
    .then((events) => {
      const map = new Map();

      const records = events.map((event) => {
        const record = normalize(event, maps);
        map.set(record.id, record);
        return record;
      });

      return { records, map };
    });
}

module.exports = { loadEvents };
