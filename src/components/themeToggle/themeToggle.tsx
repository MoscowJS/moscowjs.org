import moon from "./moon.svg"
import React from "react"
import styled from "styled-components"
import sun from "./sun.svg"
import { rhythm } from "../../utils/typography"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

const Switch = styled.label`
  display: inline-block;
  width: ${rhythm(1)};
  height: ${rhythm(2)};
  position: relative;
  line-height: ${rhythm(2)};

  margin-right: ${rhythm(0.5)};

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    height: ${rhythm(0.6)};
    width: 100%;
    top: 50%;
    cursor: pointer;
    border-radius: ${rhythm(0.3)};
    transform: translateY(-40%);

    background-color: rgba(125, 125, 125, 0.5);

    &:before {
      position: absolute;
      content: "";

      left: 0;
      top: -${rhythm(0.1)};
      transition: 0.4s ease;
      transform: translateX(-${rhythm(0.1)});

      height: ${rhythm(0.8)};
      width: ${rhythm(0.8)};
      border-radius: ${rhythm(0.5)};
      background: black url(${sun});
      background-size: 70% 70%;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  input:focus + span {
    box-shadow: 0 0 3px var(--color-outline);
  }

  input:checked + span:before {
    transform: translateX(${rhythm(0.3)});
    background: black url(${moon});
    background-size: 70% 70%;
    background-repeat: no-repeat;
    background-position: center;
  }
`

export const ThemeToggle = () => {
  return (
    <Switch>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <input
            type="checkbox"
            onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
          />
        )}
      </ThemeToggler>
      <span />
    </Switch>
  )
}
