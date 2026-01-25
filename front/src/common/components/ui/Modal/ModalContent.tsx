'use client';

import { ReactNode } from "react";
import styled from "styled-components";

interface ModalContentProps {
  className?: string;
  children: ReactNode;
}

export const ModalContent = ({ className, children }: ModalContentProps) => {
  return (<Wrapper className={className}>
    <div className='empty' />
    {children}
    <div className='empty' />
  </Wrapper>);
}

const Wrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  .empty{
    flex-grow: 1;
  }

  @media (max-width: 479px) {
    padding: 12px 4dvw;
  }
  @media (min-width:480px) and (max-width:1023px) {
    padding: 12px 24px;
  }
  @media (min-width:1024px) {
    padding: 16px 24px;
  }
`