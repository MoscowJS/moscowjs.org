'use strict';

const { loadTalks } = require('../db/talks');
const { loadEvents } = require('../db/events');
const { loadVenues } = require('../db/venues');
const { loadSpeakers } = require('../db/speakers');
const { loadCompanies } = require('../db/companies');
const { loadContacts } = require('../db/contacts');

module.exports = async function () {
  const maps = {};

  const [talks, events, venues, speakers, companies, contacts] = await Promise.all([
    loadTalks(maps),
    loadEvents(maps),
    loadVenues(maps),
    loadSpeakers(maps),
    loadCompanies(maps),
    loadContacts(maps),
  ]);

  return {
    talks,
    events,
    venues,
    speakers,
    companies,
    contacts,
  };
};
