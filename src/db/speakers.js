'use strict';

const airtableClient = require('./airtable.client');

function normalize(record) {
  return {
    id: record.getId(),
    name: record.get('Name'),
    photo: record.get('Photo'),
    company: record.get('Company'),
  };
}

function loadSpeakers() {
  return airtableClient('Speakers')
    .select({
      fields: ['Name', 'Photo', 'Company'],
    })
    .all()
    .then((events) => {
      const map = new Map();

      const records = events.map((event) => {
        const record = normalize(event);
        map.set(record.id, record);
        return record;
      });

      return { records, map };
    });
}

module.exports = { loadSpeakers };
