'use client'
import { forwardRef } from "react";
import styled from "styled-components";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}
//React.forwardRef를 이용해서 ref 저달
export const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(({ children, className }, ref) => {
  return <Wrapper ref={ref} className={className} data-scroll-container>
    {children}
  </Wrapper>
});

PageWrapper.displayName = 'PageWrapper';

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

  animation: pageIn 0.6s ease-out;

  @keyframes pageIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`