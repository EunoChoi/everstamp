'use client';

import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import Link from "next/link";
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
      <Title href={`/app/calendar?date=${getCleanTodayTime()}`}>{title}</Title>
      {children}
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`

  z-index: 99;

  display: flex;
  flex-shrink: 0;

  background-color: white;
  backdrop-filter: blur(12px);  

  @media (max-width: 479px) { //mobile port
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--mobileHeader);
    padding: 0 5%;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    justify-content: end;
    align-items: center;
    width: 75dvw;
    padding: 8px 20px;
  }
  @media (min-width:1024px) { //desktop
    align-items: center;
    justify-content: space-between;
    width: calc(100dvw - var(--sidebarWidth));
    height: var(--desktopHeader);
    padding: 0 48px;
  }
`
const Title = styled(Link)`
  color: rgb(var(--greyTitle));
  font-weight: 700;

  text-transform: uppercase;

  &:first-letter{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  @media (max-width: 479px) { //mobile port
    line-height: 0.9;
    font-size: 24px;
    border-bottom: 4px ${(props) => props.theme.point ? props.theme.point : '#979FC7'} solid;
    &:first-letter{
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: none;
  }
  @media (min-width:1024px) { //desktop
    font-size: 36px;
  }
`