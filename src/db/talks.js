'use strict';

const airtableClient = require('./airtable.client');

function normalize(record, { speakersMap }) {
  const speakersValue = Array.isArray(record.get('Speakers')) ? record.get('Speakers') : [];
  const speakers = speakersValue
    .filter((speaker) => speakersMap.has(speaker))
    .map((speaker) => speakersMap.get(speaker));

  return {
    id: record.getId(),
    title: record.get('Title'),
    theses: record.get('Theses'),
    company: record.get('Company'),
    meetup: record.get('Meetup'),
    speakers,
  };
}

function loadTalks(maps) {
  return airtableClient('Talks')
    .select({
      fields: ['Title', 'Speakers', 'Theses', 'Company', 'Meetup'],
      filterByFormula: '{Status} = "Отчитано"',
      sort: [{ field: 'Date', direction: 'desc' }],
    })
    .all()
    .then((talks) => {
      const map = new Map();

      const records = talks.map((talk) => {
        const record = normalize(talk, maps);
        map.set(record.id, record);
        return record;
      });

      return { records, map };
    });
}

module.exports = { loadTalks };
