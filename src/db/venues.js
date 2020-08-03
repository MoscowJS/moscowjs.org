'use strict';

const airtableClient = require('./airtable.client');

class Venue {
  constructor(record, maps) {
    this.record = record;
    this.maps = maps;
  }

  get id() {
    return this.record.getId();
  }

  get slug() {
    return this.record.get('Slug');
  }

  get name() {
    return this.record.get('Name');
  }

  get address() {
    return this.record.get('Address');
  }

  get addressNotes() {
    return this.record.get('Address notes');
  }

  get subway() {
    return this.record.get('Subway');
  }

  get map() {
    return this.record.get('Map');
  }
}

function loadVenues(maps) {
  return airtableClient('Venues')
    .select({
      fields: ['Slug', 'Name', 'Address', 'Subway', 'Address notes', 'Map'],
    })
    .all()
    .then((venues) => {
      maps.venuesMap = new Map();

      return venues.map((record) => {
        const venue = new Venue(record, maps);
        maps.venuesMap.set(venue.id, venue);
        return venue;
      });
    });
}

module.exports = { loadVenues };
