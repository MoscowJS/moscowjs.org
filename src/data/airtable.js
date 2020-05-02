'use strict';

const { loadEvents } = require('../db/events');
const { loadCompanies } = require('../db/companies');
const { loadSpeakers } = require('../db/speakers');

module.exports = function () {
  return loadCompanies()
    .then((companies) => {
      return Promise.all([loadEvents({ companiesMap: companies.map }), loadSpeakers()]).then(
        ([events, speakers]) => {
          return {
            events: events.records,
            speakers: speakers.records,
            companies: companies.records,
          };
        },
      );
    })
    .catch((error) => {
      console.error(error);
    });
};
