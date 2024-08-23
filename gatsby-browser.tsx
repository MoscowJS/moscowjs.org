import React from 'react'
import { GlobalLayout } from 'components/layout'

// const { auth } = require("features/firebase")

import type { GatsbyBrowser } from 'gatsby'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => {
  // @ts-ignore
  return <GlobalLayout {...props}>{element}</GlobalLayout>
}

// exports.onInitialClientRender = () => {
//   auth().onAuthStateChanged(function (user) {
//     if (!user) {
//       auth().signInAnonymously()
//     }
//   })
// }
