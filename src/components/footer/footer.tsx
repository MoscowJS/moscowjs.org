import React from "react";
import styled from "styled-components";
import { Layout } from "../../uikit";
import { rhythm } from "../../utils/typography";
import { Telegram } from "../../images/icons/telegram";
import { Facebook, Instagram, Twitter, Youtube } from "react-feather";
import { Link } from "gatsby";

const FooterContainer = styled(Layout.Container)`
  margin-bottom: ${rhythm(1)};

  @media (min-width: 768px) {
    display: flex;
  }
`

const Column = styled.div`
  flex: 1 1 auto;

  @media (min-width: 768px) {
    &:nth-child(2) {
      text-align: right;
    }
  }
`

const IconLink = styled.a`
  display: inline-block;
  margin-right: ${rhythm(1)};

  &:last-child {
    margin-right: 0;
  }
`

export const Footer = () => {
  return (
    <FooterContainer as="footer">
      <Column>
        <div>© 2011 — {new Date().getFullYear()}, MoscowJS Team</div>
        <nav>
          <Link to="/contacts/">Контакты организаторов</Link>
          <br />
          <Link to="/coc/">Правила поведения</Link>
          <br />
          <Link to="/pc/">Промокоды MoscowJS</Link>
        </nav>
      </Column>

      <Column>
        <nav>
          <IconLink href="https://t.me/moscowjs" title="Telegram MoscowJS">
            <Telegram size={rhythm(1)} />
          </IconLink>
          <IconLink
            href="https://www.instagram.com/moscowjsmeetup/"
            title="Instagram MoscowJS"
          >
            <Instagram size={rhythm(1)} />
          </IconLink>
          <IconLink
            href="https://www.youtube.com/c/moscowjs"
            title="YouTube MoscowJS"
          >
            <Youtube size={rhythm(1)} />
          </IconLink>
          <IconLink
            href="https://www.facebook.com/groups/moscowjs/"
            title="Facebook MoscowJS"
          >
            <Facebook size={rhythm(1)} />
          </IconLink>
          <IconLink
            href="https://twitter.com/moscowjs"
            title="Twitter MoscowJS"
          >
            <Twitter size={rhythm(1)} />
          </IconLink>
        </nav>
        <p>
          <a href="mailto:team@moscowjs.org">team@moscowjs.org</a>
        </p>
      </Column>
    </FooterContainer>
  )
}
