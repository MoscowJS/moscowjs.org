import styled from "styled-components"
import { rhythm } from "../../utils/typography"

export const SquarePhoto = styled.div`
  width: 100%;
  padding-top: 100%;
  height: 0;
  overflow: hidden;
  position: relative;
  margin-bottom: ${rhythm(1)};

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    vertical-align: top;
    object-fit: cover;
    filter: grayscale(1);
  }

  svg {
    position: absolute;
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
  }
`
