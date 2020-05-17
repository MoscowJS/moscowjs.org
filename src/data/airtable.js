'use strict';

const { loadTalks } = require('../db/talks');
const { loadEvents } = require('../db/events');
const { loadVenues } = require('../db/venues');
const { loadCompanies } = require('../db/companies');
const { loadSpeakers } = require('../db/speakers');

module.exports = async function () {
  const maps = {};

  const speakers = await loadSpeakers();

  maps.speakersMap = speakers.map;

  const [talks, venues] = await Promise.all([loadTalks(maps), loadVenues(maps)]);

  maps.talksMap = talks.map;
  maps.venuesMap = venues.map;

  const companies = await loadCompanies(maps);

  maps.companiesMap = companies.map;

  const events = await loadEvents(maps);

  return {
    talks: talks.records,
    venues: venues.records,
    events: events.records,
    speakers: speakers.records,
    companies: companies.records,
  };
};
