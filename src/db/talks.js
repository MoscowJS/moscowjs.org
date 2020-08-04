'use strict';

const slugify = require('slugify');

const airtableClient = require('./airtable.client');

class Talk {
  constructor(record, maps) {
    this.record = record;
    this.maps = maps;
  }

  get id() {
    return this.record.getId();
  }

  get slug() {
    return slugify(this.title, { lower: true, strict: true });
  }

  get title() {
    return this.record.get('Title');
  }

  get theses() {
    return this.record.get('Theses');
  }

  get company() {
    return this.record.get('Company');
  }

  get events() {
    const eventValue = this.record.get('Meetup');
    const events = Array.isArray(eventValue) ? eventValue : [];

    return events
      .filter((event) => this.maps.eventsMap.has(event))
      .map((event) => this.maps.eventsMap.get(event));
  }

  get speakers() {
    const speakersValue = this.record.get('Speakers');
    const speakers = Array.isArray(speakersValue) ? speakersValue : [];

    return speakers
      .filter((speaker) => this.maps.speakersMap.has(speaker))
      .map((speaker) => this.maps.speakersMap.get(speaker));
  }
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
      maps.talksMap = new Map();

      return talks.map((record) => {
        const talk = new Talk(record, maps);
        maps.talksMap.set(talk.id, talk);
        return talk;
      });
    });
}

module.exports = { loadTalks };
