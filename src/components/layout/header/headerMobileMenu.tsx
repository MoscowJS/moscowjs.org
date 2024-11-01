import React, { FunctionComponent } from 'react'
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu'
import { Menu as MenuIcon } from 'react-feather'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { rhythm } from '../../../utils/typography'
import { NavigationItem } from './index.h'

const HMMBurger = styled(MenuButton)`
  cursor: pointer;
  display: inline-block;
  padding: 0 ${rhythm(0.5)};
  line-height: ${rhythm(2)};
  border: 0;
  color: inherit;
  background: none;

  ${({ visible }) =>
    visible
      ? `
    background: var(--color-primary);
    color: var(--color-text-black);
  `
      : ''}

  svg {
    vertical-align: middle;
  }

  &:focus {
    box-shadow: var(--color-outline);
  }

  @media screen and (min-width: 45rem) {
    display: none;
  }
`

const HMMTOuterContainer = styled(Menu)`
  z-index: 100;
  transform: translate3d(0px, 66px, 0px)!important;
`

const HMMContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-primary);
  width: 100vw;

  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: scaleY(0);

  [data-enter] & {
    opacity: 1;
    transform: scaleY(1);
  }

  a {
    display: block;
    width: 100%;
    padding: ${rhythm(0.5)};
    color: var(--color-text-black);
    text-decoration: none;

    &:hover,
    &:focus {
      background-color: var(--color-primary-darker);
    }
  }
`

export const HeaderMobileMenu: FunctionComponent<{
  navigation: NavigationItem[]
}> = ({ navigation }) => {
  const menu = useMenuState({ animated: 250 })

  return (
    <>
      <HMMBurger {...menu}>
        <MenuIcon size={rhythm(1)} />
      </HMMBurger>
      <HMMTOuterContainer {...menu}>
        <HMMContainer>
          {navigation.map(({ external, url, title }) => (
            <MenuItem key={url} as="div">
              {external ? (
                <a href={url}>{title}</a>
              ) : (
                <Link to={url}>{title}</Link>
              )}
            </MenuItem>
          ))}
        </HMMContainer>
      </HMMTOuterContainer>
    </>
  )
}
