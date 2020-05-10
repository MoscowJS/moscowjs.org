'use strict';

const vhost = process.env.NODE_ENV === 'production' ? '/moscowjs.org/' : '/';

module.exports = function () {
  return {
    vhost,
  };
};
