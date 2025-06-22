'use client'

import styled from "styled-components";

interface ContentWrapper {
  children: React.ReactNode;
  className?: string;
}

export const ContentWrapper = ({ children, className }: ContentWrapper) => {
  return <Wrapper className={className}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;

  @media (max-width: 479px) { //mobile port
    height: auto;
    padding : 0 5dvw calc(var(--mobileNav) + 5dvw) 5dvw;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet  
    min-height: 100%; 
    overflow: scroll;
    padding : 0 36px 36px 36px;  
  }
  @media (min-width:1025px) { //desktop
    height: auto;
    padding: 0 36px 36px 36px;  
  }
`