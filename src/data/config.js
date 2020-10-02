'use strict';

// const vhost = process.env.NODE_ENV === 'production' ? '/moscowjs.org' : '';
const vhost = '';

module.exports = function () {
  return {
    vhost,
  };
};
