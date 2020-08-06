const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter('stringify', (value) => {
    return JSON.stringify(value, null, 2);
  });

  eleventyConfig.addNunjucksFilter('getLastEvent', (events) => {
    const announced = events.find((status) => status === 'Анонс');
    if (typeof announced !== 'undefined') {
      return announced;
    }
    return events[0];
  });

  eleventyConfig.addNunjucksFilter('toDateFormat', (value, format) => {
    const date = DateTime.fromISO(value).setLocale('ru').setZone('Europe/Moscow');
    const formated = date.isValid ? date.toFormat(format) : '';
    return formated;
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
