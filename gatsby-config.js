const path = require("path")
const dotenv = require("dotenv")
 
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})
dotenv.config({
  path: `.env.${process.env.NODE_ENV}.local`,
  override: true,
})

require("ts-node").register()

module.exports = {
  flags: {
    DEV_SSR: false,
  },
  pathPrefix: undefined,
  siteMetadata: {
    siteUrl: "https://moscowjs.org/",
    title: `MoscowJS`,
    description: `Регулярные встречи JavaScript-разработчиков в Москве. Обсуждаем фреймворки, инструменты и процессы. Делимся знаниями и личным опытом в неформальной обстановке.`,
    author: `@moscowjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/src/static`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-cname",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MoscowJS Community Website`,
        short_name: `MoscowJS`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#F7DF1F`,
        display: `minimal-ui`,
        lang: "ru",
        cache_busting_mode: "none",
        icon: `src/static/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        src: path.join(__dirname, "src"),
        components: path.join(__dirname, "src/components"),
        models: path.join(__dirname, "src/models"),
        static: path.join(__dirname, "src/static"),
        features: path.join(__dirname, "src/features"),
        utils: path.join(__dirname, "src/utils"),
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Meetups`,
            tableView: `moscowjs.org`,
            queryName: "meetups",
            tableLinks: ["Talks", "Company", "Venue", "Partners"],
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Companies`,
            tableView: `moscowjs.org`,
            queryName: "companies",
            tableLinks: ["Meetups", "Venues"],
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Talks`,
            tableView: `moscowjs.org`,
            queryName: "talks",
            tableLinks: ["Meetup", "Speakers"],
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Venues`,
            tableView: `moscowjs.org`,
            queryName: "venues",
            tableLinks: ["Meetups", "Companies"],
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Speakers`,
            tableView: `moscowjs.org`,
            queryName: "speakers",
            mapping: {
              Photo: "fileNode",
            },
            tableLinks: ["Talks"],
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Orgs`,
            tableView: `moscowjs.org`,
            queryName: "orgs",
            tableLinks: ["Speaker"],
            mapping: {
              Photo: "fileNode",
            },
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Partners`,
            queryName: "partners",
            mapping: {
              Logo: "fileNode",
            },
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_META_BASE_ID,
            tableName: `config`,
            queryName: "config",
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_META_BASE_ID,
            tableName: `navigation`,
            queryName: "navigation",
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_META_BASE_ID,
            tableName: `pages`,
            queryName: "pages",
            separateNodeType: true,
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [`/cfp/`, `/contacts/`, `/coc/`, `/pc/`],
    //   },
    // },
  ],
}
