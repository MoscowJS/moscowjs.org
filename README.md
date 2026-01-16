# MoscowJS — moscowjs.org

Site of MoscowJS, JavaScript meetup group in Moscow.

## Contributing

By contributing to moscowjs.org, you agree to abide by the [code of conduct](/code-of-conduct.md).

1. Fork the repo
2. Checkout the `main` branch
3. Install dependencies

```
git clone https://github.com/MoscowJS/moscowjs.org
cd moscowjs.org
n auto # or nvm use
npm install
```

4. Create a new branch from the develop branch.
5. Make your changes. Make sure the command `npm run build` is passing.
6. Commit and finally send a GitHub Pull Request with a clear list of what you've done (read more [about pull requests](https://help.github.com/articles/about-pull-requests/)). Make sure all of your commits are atomic (one feature per commit) and have meaningful commit messages.

## Development

### How to develop locally

1. Create env file
   - Retrieve directus token from Directus admin panel and put it to DIRECTUS_TOKEN value

```
cp .env.example .env
```

2. Run develop script

```
node --require dotenv/config node_modules/.bin/gatsby build -- --verbose
```

## License

MIT License

Copyright (c) 2021 MoscowJS Team

See [LICENSE](/LICENSE). for full text.
