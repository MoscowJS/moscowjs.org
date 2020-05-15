const { DateTime } = require('luxon');
const slugify = require('slugify');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncFilter('stringify', (value, cb) =>
    cb(null, JSON.stringify(value, null, 2)),
  );

  eleventyConfig.addNunjucksAsyncFilter('slugify', (value, cb) => {
    try {
      cb(null, slugify(value, { lower: true }));
    } catch (error) {
      cb(error);
    }
  });

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
