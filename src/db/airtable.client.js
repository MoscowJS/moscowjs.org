'use strict';

const { config } = require('dotenv');
const Airtable = require('airtable');

config();

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_TOKEN,
  requestTimeout: process.env.AIRTABLE_REQUEST_TIMEOUT,
});

module.exports = airtable.base(process.env.AIRTABLE_API_BASE);
