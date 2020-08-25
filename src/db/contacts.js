'use strict';

const slugify = require('slugify');
const airtableClient = require('./airtable.client');

class Contact {
  constructor(record, maps) {
    this.record = record;
    this.maps = maps;
  }

  get id() {
    return this.record.getId();
  }

  get slug() {
    return slugify(this.displayName, { lower: true, strict: true });
  }

  get displayName() {
    return this.record.get('Display name');
  }

  get speaker() {
    const speakerValue = this.record.get('Speaker');
    if (!(Array.isArray(speakerValue) && speakerValue.length === 1)) {
      throw new Error(`SpeakerId is required. See airtable#Orgs#${this.displayName}`);
    }

    const [speakerId] = speakerValue;

    if (!this.maps.speakersMap.has(speakerId)) {
      throw new Error(`Speaker not found in Map. ${this.displayName}`);
    }

    return this.maps.speakersMap.get(speakerId);
  }
}

function loadContacts(maps) {
  return airtableClient('Orgs')
    .select({
      fields: ['Display name', 'Speaker'],
      filterByFormula: 'AND({Статус} != "Помощник", {Статус} != "Ex")',
      sort: [{ field: 'Display name', direction: 'asc' }],
    })
    .all()
    .then((contacts) => {
      maps.contactsMap = new Map();

      return contacts.map((record) => {
        const contact = new Contact(record, maps);
        maps.contactsMap.set(contact.id, contact);
        return contact;
      });
    });
}

module.exports = { loadContacts };
