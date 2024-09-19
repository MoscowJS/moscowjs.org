import path from 'node:path'
import type { GatsbyConfig } from 'gatsby'

import { config } from './config'

const GATSBY_SRC_ROOT = config.gatsby.src

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
        icon: `${GATSBY_SRC_ROOT}/static/logo.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `${GATSBY_SRC_ROOT}/utils/typography`,
      },
    },
    {
      resolve: '@directus/gatsby-source-directus',
      options: {
        url: config.directus.url,
        auth: {
          token: config.directus.token,
        },
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

export default gatsbyConfig
