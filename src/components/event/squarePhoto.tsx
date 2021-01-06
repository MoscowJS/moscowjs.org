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
    width: 100%;
    vertical-align: top;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1);
  }
`
