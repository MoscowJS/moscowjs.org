const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncFilter('stringify', (value, cb) =>
    cb(null, JSON.stringify(value, null, 2)),
  );

  eleventyConfig.addNunjucksAsyncFilter('toDateFormat', (value, format, cb) => {
    const date = DateTime.fromISO(value).setLocale('ru').setZone('Europe/Moscow');
    const formated = date.isValid ? date.toFormat(format) : '';
    cb(null, formated);
  });

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
