/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-b398b4d484de72e41360.js"
  },
  {
    "url": "styles.31def4260f4ad8dfd88b.css"
  },
  {
    "url": "styles-7d4153d260c0197f0043.js"
  },
  {
    "url": "framework-ee8a4bba4771daaa13e7.js"
  },
  {
    "url": "ff239f9d-46beae47a53ed2c3c821.js"
  },
  {
    "url": "d91e9ae9-adfdd6f1677a1d1f2330.js"
  },
  {
    "url": "app-4df7fd33a11c7bba5a73.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "d6cb2010d9c61690465658c60e607f1e"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-fd4fb51a6fac1c18bdde.js"
  },
  {
    "url": "polyfill-9b571efec6f456e4010f.js"
  },
  {
    "url": "5004c701065f9351cfd198969a999556dc3874d1-c97f3038ba0f6c02645f.js"
  },
  {
    "url": "component---src-templates-page-index-tsx-cd04c8373c589486124d.js"
  },
  {
    "url": "page-data/cfp/page-data.json",
    "revision": "dd90a8dcaf4438b53198735611feb602"
  },
  {
    "url": "page-data/sq/d/3150323597.json",
    "revision": "daa8cfe2314eda5caf412367534921e5"
  },
  {
    "url": "page-data/sq/d/3477189030.json",
    "revision": "6cf8a0e393b67b04b43057ee65aaeb86"
  },
  {
    "url": "page-data/sq/d/4130114283.json",
    "revision": "35f466c882c38a16fc37eb1e54c04b52"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "5b27450707c28ee8226b1952af9bafc9"
  },
  {
    "url": "component---src-templates-contacts-index-tsx-1527c56130ea2410feb8.js"
  },
  {
    "url": "page-data/contacts/page-data.json",
    "revision": "aec91514032a3040997ffe77d0717ad8"
  },
  {
    "url": "page-data/coc/page-data.json",
    "revision": "5e144d364a21e5fec4f4ce70b715779c"
  },
  {
    "url": "page-data/pc/page-data.json",
    "revision": "b92ca2a62e59129d301586cee22f4be1"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "9d1585afff3fe6b400dff133dd079def"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-4df7fd33a11c7bba5a73.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
