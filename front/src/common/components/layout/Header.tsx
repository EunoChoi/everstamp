'use client';

import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  title: string;
  children?: ReactNode;
  classname?: string;
}

const Header = ({ title, children, classname }: Props) => {
  return (
    <Wrapper className={classname}>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  @media (max-width: 479px) { //mobile port
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--mobileHeader);
    padding: 0 4%;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    justify-content: end;
    align-items: center;
    width: 75dvw;
    padding: 0 20px;
  }
  @media (min-width:1025px) { //desktop
    align-items: center;
    justify-content: space-between;
    width: calc(100dvw - var(--sidebarWidth));
    padding: 0 48px;
    height: var(--desktopHeader);
  }
`
const Title = styled.span`
  color: rgb(var(--greyTitle));
  font-weight: 700;

  text-transform: uppercase;
  

  &:first-letter{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  @media (max-width: 479px) { //mobile port
    line-height: 0.9;
    font-size: 28px;
    /* border-bottom: 2px ${(props) => props.theme.point ? props.theme.point : '#979FC7'} solid; */
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    display: none;
  }
  @media (min-width:1025px) { //desktop
    /* font-size: 36px; */
    opacity: 0;
  }
`