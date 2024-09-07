import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
// import Img from 'gatsby-image'

import { rhythm } from '../../../utils/typography'
import { Telegram } from '../../../components/icons'
import { Item, Markdown } from '../../../components/layout'
import type { Partner } from '../../../models'

const SmallHeader = styled(Item.Header)`
  font-size: ${rhythm(0.75)};
  margin-bottom: 0;
`
export const PartnerLink: FunctionComponent<{
  partner: Partner
}> = ({ partner }) => {
  return (
    <Item>
      {partner.link === 'logo' ? (
        <Item.ImageContainer verticalAlign="center" size="xs">
          {/* <Img
            fixed={Logo.localFiles[0].childImageSharp.fixed}
            alt={`${Name} logo`}
          /> */}
        </Item.ImageContainer>
      ) : (
        <Item.Icon verticalAlign="center" size="xs" Icon={Telegram} />
      )}

      <Item.Content verticalAlign="center">
        <SmallHeader as="h5">
          <a href={partner.link}>{partner.name}</a>
        </SmallHeader>
        <Markdown>{partner.description}</Markdown>
      </Item.Content>
    </Item>
  )
}
