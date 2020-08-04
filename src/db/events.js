'use strict';

const airtableClient = require('./airtable.client');

class Event {
  constructor(record, maps) {
    this.record = record;
    this.maps = maps;

    // company,
  }

  get id() {
    return this.record.getId();
  }

  get slug() {
    return this.record.get('Slug');
  }

  get title() {
    return this.record.get('Title');
  }

  get date() {
    return this.record.get('Date');
  }

  get longAnnouncement() {
    return this.record.get('Long Announcement');
  }

  get talks() {
    const talksValue = this.record.get('Talks');
    const talks = Array.isArray(talksValue) ? talksValue : [];

    return talks
      .filter((talk) => this.maps.talksMap.has(talk))
      .map((talk) => this.maps.talksMap.get(talk));
  }

  get venue() {
    const venuesValue = this.record.get('Venue');
    const venues = Array.isArray(venuesValue) ? venuesValue : [];

    if (venues.length === 0) {
      return {};
    }

    const [venue] = venues;

    if (!this.maps.venuesMap.has(venue)) {
      return {};
    }

    return this.maps.venuesMap.get(venue);
  }

  get company() {
    const companyValue = this.record.get('Company');
    const companies = Array.isArray(companyValue) ? companyValue : [];

    if (companies.length === 0) {
      return {};
    }

    const [company] = companies;

    if (!this.maps.companiesMap.has(company)) {
      return {};
    }

    return this.maps.companiesMap.get(company);
  }
}

function loadEvents(maps) {
  return airtableClient('Meetups')
    .select({
      fields: ['Slug', 'Title', 'Company', 'Talks', 'Venue', 'Long Announcement', 'Date'],
      filterByFormula: 'OR({Статус} = "Подготовка", {Статус} = "Завершен")',
      sort: [{ field: 'Date', direction: 'desc' }],
    })
    .all()
    .then((events) => {
      maps.eventsMap = new Map();

      return events.map((record) => {
        const event = new Event(record, maps);
        maps.eventsMap.set(event.id, event);
        return event;
      });
    });
}

module.exports = { loadEvents };
