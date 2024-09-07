import React from 'react'
import type { GatsbyBrowser } from 'gatsby'

// const { auth } = require("features/firebase")
import { GlobalLayout } from './src/components/layout'

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
