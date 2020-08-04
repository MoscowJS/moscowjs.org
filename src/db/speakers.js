'use strict';

const slugify = require('slugify');
const airtableClient = require('./airtable.client');

class Speaker {
  constructor(record, maps) {
    this.record = record;
    this.maps = maps;
  }

  get id() {
    return this.record.getId();
  }

  get slug() {
    return slugify(this.name, { lower: true });
  }

  get name() {
    return this.record.get('Name');
  }

  get photo() {
    return this.record.get('Photo');
  }

  get about() {
    return this.record.get('About');
  }

  get company() {
    return this.record.get('Company');
  }

  get email() {
    return this.record.get('Email');
  }

  get skype() {
    return this.record.get('Skype');
  }

  get personalLink() {
    return this.record.get('Personal link');
  }

  get github() {
    return this.record.get('Github / Bitbucket');
  }

  get twitter() {
    return this.record.get('Twitter');
  }

  get talks() {
    const talksValue = this.record.get('Talks');
    const talks = Array.isArray(talksValue) ? talksValue : [];

    return talks
      .filter((talk) => this.maps.talksMap.has(talk))
      .map((talk) => this.maps.talksMap.get(talk));
  }
}

function loadSpeakers(maps) {
  return airtableClient('Speakers')
    .select({
      fields: [
        'Name',
        'Photo',
        'About',
        'Company',
        'Email',
        'Skype',
        'Personal link',
        'Github / Bitbucket',
        'Twitter',
        'Talks',
      ],
      sort: [
        { field: 'Count', direction: 'desc' },
        { field: 'Meetup', direction: 'desc' },
      ],
    })
    .all()
    .then((speakers) => {
      maps.speakersMap = new Map();

      return speakers.map((record) => {
        const speaker = new Speaker(record, maps);
        maps.speakersMap.set(speaker.id, speaker);
        return speaker;
      });
    });
}

module.exports = { loadSpeakers };
