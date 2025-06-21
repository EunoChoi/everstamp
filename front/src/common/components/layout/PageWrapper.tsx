'use client'
import { forwardRef } from "react";
import styled from "styled-components";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}
//React.forwardRef를 이용해서 ref 저달
export const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(({ children, className }, ref) => {
  return <Wrapper ref={ref} className={className} >
    {children}
  </Wrapper>
});

const Wrapper = styled.div`
  width: 100%;
  min-width: 400px;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  @media (max-width: 479px) { //mobile port
    min-width: 90%;
    padding-bottom: calc(var(--mobileNav) + 24px);
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    max-width: 75dvw;
    padding: 0 20px;  
  }
  @media (min-width:1025px) { //desktop
    max-width: 600px;
    padding: 0 20px;  
  }
`