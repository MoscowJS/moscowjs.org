'use strict';

const airtableClient = require('./airtable.client');

function normalize(record) {
  return {
    id: record.getId(),
    slug: record.get('Slug'),
    name: record.get('Name'),
    address: record.get('Address'),
    addressNotes: record.get('Address notes'),
    subway: record.get('Subway'),
    map: record.get('Map'),
  };
}

function loadVenues() {
  return airtableClient('Venues')
    .select({
      fields: ['Slug', 'Name', 'Address', 'Subway', 'Address notes', 'Map'],
    })
    .all()
    .then((venues) => {
      const map = new Map();

      const records = venues.map((venue) => {
        const record = normalize(venue, {});
        map.set(record.id, record);
        return record;
      });

      return { records, map };
    });
}

module.exports = { loadVenues };
