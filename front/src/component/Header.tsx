'use client';

import styled from "styled-components";
import IsMobile from "@/hooks/IsMobile";
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Props {
  title: string
}

const Header = ({ title }: Props) => {

  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 99;

  display: flex;
  flex-shrink: 0;
  align-items: end;


  @media (max-width: 479px) { //mobile port
    width: 100%;
    height: var(--mobileHeader);

    padding : 0 5%;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: none;
  }
  @media (min-width:480px) and (min-width:1024px) { //desktop
    width: calc(100dvw - 350px);
    height: var(--desktopHeader);

    padding: 0 20px;
    max-width: 800px;
  }
`
const Title = styled.span`
  color: rgb(var(--greyTitle));
  font-size: 42px;
  font-weight: 700;

  text-transform: uppercase;

  &:first-letter{
    color: rgb(var(--point));
  }
  @media (max-width: 479px) { //mobile port
    line-height: 1.1;
    font-size: 36px;
    border-bottom: 4px rgb(var(--point)) solid;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 5vh;
  }
`