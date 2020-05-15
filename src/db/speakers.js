'use strict';

const airtableClient = require('./airtable.client');

function normalize(record) {
  return {
    id: record.getId(),
    name: record.get('Name'),
    photo: record.get('Photo'),
    about: record.get('About'),
    company: record.get('Company'),
    email: record.get('Email'),
    skype: record.get('Skype'),
    personalLink: record.get('Personal link'),
    github: record.get('Github / Bitbucket'),
    twitter: record.get('Twitter'),
    talks: record.get('Talks'),
  };
}

function loadSpeakers() {
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
