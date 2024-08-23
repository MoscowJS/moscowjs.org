import React from 'react'
import type { GatsbySSR } from 'gatsby'

import { GlobalLayout } from './src/components/layout/globalLayout'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props,
}) => {
  // @ts-ignore
  return <GlobalLayout {...props}>{element}</GlobalLayout>
}
