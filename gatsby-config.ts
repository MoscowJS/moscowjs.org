import path from 'node:path'
import type { GatsbyConfig, PluginRef } from 'gatsby'

import { config } from './config'

const GATSBY_SRC_ROOT = config.gatsby.src ?? 'src'

let datasourcePlugin: PluginRef

if (config.gatsby.datasource === 'airtable') {
  datasourcePlugin = {
    resolve: 'gatsby-source-airtable',
    options: {
      apiKey: config.airtable.apiKey,
      concurrency: 5,
      tables: [
        {
          baseId: config.airtable.baseId,
          tableName: 'Meetups',
          tableView: 'moscowjs.org',
          queryName: 'meetups',
          tableLinks: ['Talks', 'Company', 'Venue', 'Partners'],
          separateNodeType: true,
        },
        {
          baseId: config.airtable.baseId,
          tableName: 'Companies',
          tableView: 'moscowjs.org',
          queryName: 'companies',
          tableLinks: ['Meetups', 'Venues'],
          separateNodeType: true,
        },
        {
          baseId: config.airtable.baseId,
          tableName: 'Talks',
          tableView: 'moscowjs.org',
          queryName: 'talks',
          tableLinks: ['Meetup', 'Speakers'],
          separateNodeType: true,
        },
        {
          baseId: config.airtable.baseId,
          tableName: 'Venues',
          tableView: 'moscowjs.org',
          queryName: 'venues',
          tableLinks: ['Meetups', 'Companies'],
          separateNodeType: true,
        },
        {
          baseId: config.airtable.baseId,
          tableName: 'Speakers',
          tableView: 'moscowjs.org',
          queryName: 'speakers',
          mapping: {
            Photo: 'fileNode',
          },
          tableLinks: ['Talks'],
          separateNodeType: true,
        },
        {
          baseId: config.airtable.baseId,
          tableName: 'Orgs',
          tableView: 'moscowjs.org',
          queryName: 'orgs',
          tableLinks: ['Speaker'],
          mapping: {
            Photo: 'fileNode',
          },
          separateNodeType: true,
        },
        {
          baseId: config.airtable.baseId,
          tableName: 'Partners',
          queryName: 'partners',
          mapping: {
            Logo: 'fileNode',
          },
          separateNodeType: true,
        },
        {
          baseId: config.airtable.metaBaseId,
          tableName: 'config',
          queryName: 'config',
          separateNodeType: true,
        },
        {
          baseId: config.airtable.metaBaseId,
          tableName: 'navigation',
          queryName: 'navigation',
          separateNodeType: true,
        },
        {
          baseId: config.airtable.metaBaseId,
          tableName: 'pages',
          queryName: 'pages',
          separateNodeType: true,
        },
      ],
    },
  }
} else {
  datasourcePlugin = {
    resolve: '@directus/gatsby-source-directus',
    options: {
      url: config.directus.url,
      auth: {
        email: config.directus.email,
        password: config.directus.password,
      },
    },
  }
}

const gatsbyConfig: GatsbyConfig = {
  flags: {
    DEV_SSR: false,
  },
  pathPrefix: undefined,
  siteMetadata: {
    siteUrl: 'https://moscowjs.org/',
    title: 'MoscowJS',
    description:
      'Регулярные встречи JavaScript-разработчиков в Москве. Обсуждаем фреймворки, инструменты и процессы. Делимся знаниями и личным опытом в неформальной обстановке.',
    author: '@moscowjs',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'static',
        path: path.join(__dirname, `${GATSBY_SRC_ROOT}/static`),
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-cname',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'MoscowJS Community Website',
        short_name: 'MoscowJS',
        start_url: '/',
        background_color: '#000',
        theme_color: '#F7DF1F',
        display: 'minimal-ui',
        lang: 'ru',
        cache_busting_mode: 'none',
        icon: '${GATSBY_SRC_ROOT}/static/logo.png',
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `${GATSBY_SRC_ROOT}/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, `${GATSBY_SRC_ROOT}`),
        components: path.join(__dirname, `${GATSBY_SRC_ROOT}/components`),
        models: path.join(__dirname, `${GATSBY_SRC_ROOT}/models`),
        static: path.join(__dirname, `${GATSBY_SRC_ROOT}/static`),
        features: path.join(__dirname, `${GATSBY_SRC_ROOT}/features`),
        utils: path.join(__dirname, `${GATSBY_SRC_ROOT}/utils`),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // {
    //   resolve: 'gatsby-plugin-offline',
    //   options: {
    //     precachePages: ['/cfp/', '/contacts/', '/coc/', '/pc/'],
    //   },
    // },
  ],
}

gatsbyConfig.plugins!.push(datasourcePlugin)

export default gatsbyConfig
