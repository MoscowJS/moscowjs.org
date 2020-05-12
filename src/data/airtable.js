'use strict';

const { loadEvents } = require('../db/events');
const { loadVenues } = require('../db/venues');
const { loadCompanies } = require('../db/companies');
const { loadSpeakers } = require('../db/speakers');

module.exports = async function () {
  const maps = {};
  const venues = await loadVenues();

  maps.venuesMap = venues.map;

  const companies = await loadCompanies(maps);

  maps.companiesMap = companies.map;

  const [events, speakers] = await Promise.all([loadEvents(maps), loadSpeakers(maps)]);

  return {
    venues: venues.records,
    events: events.records,
    speakers: speakers.records,
    companies: companies.records,
  };
};
