import React, { FunctionComponent, ReactElement } from "react";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog";
import styled from "styled-components";

const BackdropStyled = styled(DialogBackdrop)`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: opacity 250ms ease-in-out;

  body.dark-mode & {
    background: rgba(255, 255, 255, 0.3);
  }

  &[data-enter] {
    opacity: 1;
  }
`;

const DialogContainer = styled.div`
    height: 100%;
    outline: 0;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: center;

    &:after {
      width: 0;
      height: 100%;
      content: '';
      display: inline-block;
      vertical-align: middle;
    }
`

const DialogStyled = styled(Dialog)`
    max-width: 20rem;
    display: inline-block;
    text-align: left;
    vertical-align: middle;
    background: var(--color-background);
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.25);
    margin: 1.2rem;
    padding: 1.2rem;
    position: relative;
    overflow-y: auto;

  &[data-enter] {
    opacity: 1;
    /* transform: translate3d(-50%, 0, 0); */
  }
`; 

export const Modal: FunctionComponent<{
  disclosure: JSX.Element
}> = ({ disclosure, ...props }) => {
  const dialog = useDialogState({ animated: 250 });
  
  return (
    <>
      <DialogDisclosure {...dialog} ref={(disclosure as any).ref} {...disclosure.props}>
        {(disclosureProps) => React.cloneElement(disclosure, disclosureProps)}
      </DialogDisclosure>
      <BackdropStyled {...dialog}>
        <DialogContainer>
          <DialogStyled {...dialog} {...props} />
        </DialogContainer>
      </BackdropStyled>
    </>
  );
}
