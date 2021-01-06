import logo from "../../images/logo.png"
import React, { FunctionComponent } from "react"
import starry from "../../images/starry_background.png"
import styled from "styled-components"
import { sizes } from "../../uikit/item/item.h"
import { IconProps } from "react-feather"

const getSize = (size?: keyof typeof sizes) => sizes[size || "tiny"]

const Number = styled.span<{
  size: keyof typeof sizes
  number: string
}>`
  display: inline-block;
  line-height: 1;
  font-size: calc(
    ${({ size, number }) =>
      `${getSize(size)} / ${number.length > 2 ? "2" : "1.7"}`}
  );
  font-weight: 700;
  color: black;
  user-select: none;

  position: absolute;
  bottom: 0;
  right: calc(${({ size }) => getSize(size)} / 30);
`

const Background = styled.div<{
  size: keyof typeof sizes
  number?: string
}>`
  display: inline-block;
  height: ${({ size }) => getSize(size)};
  width: ${({ size }) => getSize(size)};
  background: url(${({ number }) => (number ? starry : logo)});
  background-size: cover;
  position: relative;
`

export const EventLogo: FunctionComponent<{
  size: keyof typeof sizes
  title: string
}> = ({ size, title }) => {
  const number = title.match(/\d+/)?.[0]

  return (
    <Background size={size} number={number}>
      {number && (
        <Number size={size} number={number}>
          {number}
        </Number>
      )}
    </Background>
  )
}
