'use strict';

const airtableClient = require('./airtable.client');

class Company {
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

  get venues() {
    const venuesValue = this.record.get('Venues');
    const venues = Array.isArray(venuesValue) ? venuesValue : [];

    return venues
      .filter((venue) => this.maps.venuesMap.has(venue))
      .map((venue) => this.maps.venuesMap.get(venue));
  }
}

function loadCompanies(maps) {
  return airtableClient('Companies')
    .select({
      fields: ['Slug', 'Name', 'Venues'],
    })
    .all()
    .then((companies) => {
      maps.companiesMap = new Map();

      return companies.map((record) => {
        const company = new Company(record, maps);
        maps.companiesMap.set(company.id, company);
        return company;
      });
    });
}

module.exports = { loadCompanies };
