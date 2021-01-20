import React from "react"
import styled from "styled-components"
import { FunctionComponent } from "react"
import { rhythm } from "utils/typography"
import { Checkbox, CheckboxProps } from "reakit/Checkbox";

const CheckboxToggleContainer = styled.label<{
  imageOn?: string
  imageOff?: string
}>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  vertical-align: middle;

  .checkbox-toggle-input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  .checkbox-toggle-faux {
    display: block;
    width: ${rhythm(1.6)};
    height: ${rhythm(1)};
    transition: all 0.3s ease;
    border-radius: ${rhythm(0.5)};
    border: ${rhythm(0.1)} solid rgba(120, 120, 120, 0.2);
    background-color: rgba(120, 120, 120, 0.1);
    position: relative;

    &:after {
      content: "";
      top: 0px;
      bottom: 0px;
      margin: auto;
      width: ${rhythm(0.8)};
      height: ${rhythm(0.8)};
      transition: all 0.3s ease;
      border-radius: ${rhythm(0.4)};
      background-color: rgba(0, 0, 0, 0.7);
      background-size: ${rhythm(0.6)} ${rhythm(0.6)};
      background-position: center;
      background-repeat: no-repeat;
      background-image: ${({ imageOff }) =>
        imageOff ? `url(${imageOff})` : "none"};
      position: absolute;
      box-sizing: border-box;
      transform: translateX(0);
    }
  }

  .checkbox-toggle-input:checked + .checkbox-toggle-faux {
    background-color: var(--color-primary);

    &:after {
      box-shadow: none;
      transform: translateX(${rhythm(0.6)});
      background-image: ${({ imageOn }) =>
        imageOn ? `url(${imageOn})` : "none"};
    }
  }

  .checkbox-toggle-label {
    margin-left: 0.75rem;
  }

  &:hover {
    .checkbox-toggle-faux {
      background-color: rgba(120, 120, 120, 0.6);
    }

    .checkbox-toggle-input:checked + .checkbox-toggle-faux {
      background-color: var(--color-primary-darker);
    }
  }

  .checkbox-toggle-input:focus + .checkbox-toggle-faux {
    box-shadow: var(--color-outline);
  }
`

export const CheckboxToggle: FunctionComponent<{
  imageOn?: string
  imageOff?: string
} & CheckboxProps> = ({
  children,
  imageOn,
  imageOff,
  className,
  ...props
}) => {
  return (
    <CheckboxToggleContainer className={className} imageOn={imageOn} imageOff={imageOff}>
      <Checkbox
        className="checkbox-toggle-input"
        { ...props }
      />
      <span className="checkbox-toggle-faux" />
      {children && <span className="checkbox-toggle-label">{children}</span>}
    </CheckboxToggleContainer>
  )
}
