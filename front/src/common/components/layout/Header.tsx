'use client';

import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children?: ReactNode;
  classname?: string;
}

const Header = ({ children, classname }: Props) => {
  return (
    <Wrapper className={classname}>
      {children}
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;

  justify-content: end;
  align-items: center;

  position: fixed;
  top: 0;

  z-index: 9999;
  /* background-color: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px); */

  @media (max-width: 479px) { //mobile port
    width: 100%;
    height: var(--mobileHeader);
    padding: 0 5%;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    width: 75dvw;
    padding: 0 20px;
    right: 0;
  }
  @media (min-width:1025px) { //desktop
    width: calc(100dvw - var(--sidebarWidth));
    padding: 0 48px;
    height: var(--desktopHeader);
    /* background-color: transparent;
    backdrop-filter: none; */
    right: 0;
  }
`