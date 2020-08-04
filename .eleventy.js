const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncFilter('stringify', (value, cb) =>
    cb(null, JSON.stringify(value, null, 2)),
  );

  eleventyConfig.addNunjucksAsyncFilter('toDateFormat', (value, format, cb) =>
    cb(null, DateTime.fromISO(value).setZone('Europe/Moscow').toFormat(format)),
  );

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      data: 'data',
      layouts: 'layouts',
    },
  };
};
