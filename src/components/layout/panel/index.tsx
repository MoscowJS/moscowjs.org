import styled from "styled-components"
import { rhythm } from "utils/typography"

export const Panel = styled.div`
    border: 2px solid var(--color-primary);
    padding: ${rhythm(0.5)};

    margin-bottom: ${rhythm(1)};

    > *:last-child {
        margin-bottom: 0;
    }
`