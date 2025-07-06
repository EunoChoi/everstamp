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
    padding : 0 4dvw calc(var(--mobileNav) + 4dvw) 4dvw;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet  
    overflow: scroll;
    padding : 36px;  
  }
  @media (min-width:1025px) { //desktop
    padding: 36px;  
  }
`