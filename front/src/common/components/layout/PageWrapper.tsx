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
  height: 100dvh;

  border: none;
  outline: none;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  overflow-y: scroll;
`