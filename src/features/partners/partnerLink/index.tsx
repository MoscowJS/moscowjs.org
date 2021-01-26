import { PartnersData } from "models"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { rhythm } from "utils/typography"
import { Item, Markdown } from "components/layout"
import { Telegram } from "components/icons"
import Img from 'gatsby-image'

const SmallHeader = styled(Item.Header)`
  font-size: ${rhythm(0.75)};
  margin-bottom: 0;
`
export const PartnerLink: FunctionComponent<{
  partnerData: PartnersData
}> = ({ partnerData }) => {
  const { Name, Description, Logo, Link } = partnerData

  return (
    <Item>
      { 
        Logo ? (
          <Item.ImageContainer verticalAlign="center" size="xs">
            <Img
              fixed={Logo.localFiles[0].childImageSharp.fixed}
              alt={`${Name} logo`}
            />
          </Item.ImageContainer>
        ) : (
          <Item.Icon verticalAlign="center" size="xs" Icon={Telegram} />
        )
      }

      <Item.Content verticalAlign="center">
        <SmallHeader as="h5">
          <a href={Link}>{Name}</a>
        </SmallHeader>
        <Markdown>{Description}</Markdown>
      </Item.Content>
    </Item>
  )
}
