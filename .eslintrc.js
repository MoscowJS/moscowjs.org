module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'script',
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    strict: ['error', 'safe'],
  },
};
