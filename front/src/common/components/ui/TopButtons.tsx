'use client';

import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children?: ReactNode;
  classname?: string;
}

const TopButtons = ({ children, classname }: Props) => {
  return (
    <Wrapper className={classname}>
      {children}
    </Wrapper>
  );
}

export default TopButtons;

const Wrapper = styled.div`
  z-index: 999;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-shrink: 0;
  gap: 6px;

  width: auto;
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;

  /* background-color: transparent; */
  background-color: rgba(255,255,255,0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  @media (max-width: 479px) { //mobile port
    height: var(--mobileHeader);
    padding: 0 4dvw;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    height: var(--mobileHeader);
    padding: 0 20px;
  }
  @media (min-width:1025px) { //desktop
    height: var(--desktopHeader);
    padding: 0 48px;
  }

  button{
    display: flex;
    justify-content: center;
    align-items: center;

    height: 28px;

    transition: all ease-in-out 200ms;
    text-transform: capitalize;

    font-size: 14px;
    font-weight: 500;
    color: rgb(var(--greyTitle));
    font-weight: 500;
    color: white;
    background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
    border: 2px solid rgba(0,0,0,0.07);
    border-radius : 48px;

    &.small{
      width: 47px;
    }
    &.normal{
      width: 60px;
    }
    &.large{
      width: 80px;
    }
    &.auto{
      width: auto;
      padding: 0 12px;
      gap: 12px;
    }
    @media (min-width:1025px) { //desktop
      padding: 4px 12px;
      height: 32px;
    }
  }
`