'use strict';

const { loadTalks } = require('../db/talks');
const { loadEvents } = require('../db/events');
const { loadVenues } = require('../db/venues');
const { loadCompanies } = require('../db/companies');
const { loadSpeakers } = require('../db/speakers');

module.exports = async function () {
  const maps = {};

  const [talks, events, venues, speakers, companies] = await Promise.all([
    loadTalks(maps),
    loadEvents(maps),
    loadVenues(maps),
    loadSpeakers(maps),
    loadCompanies(maps),
  ]);

  return {
    talks,
    events,
    venues,
    speakers,
    companies,
  };
};
