module.exports = {
  skipCI: true,
  hooks: {
    'pre-commit': 'npm run lint',
  },
};
