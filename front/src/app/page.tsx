'use client';

import Image from "next/image";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation'

//hooks
import IsMobile from "@/function/IsMobile";
import Indicator from "@/component/indicator";

//image

const App = () => {
  const router = useRouter()
  const isMobile = IsMobile();

  const [page, setPage] = useState<number>(0);
  const slideWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper
      onScroll={(e) => {
        setPage(Math.round((e.currentTarget?.scrollTop - 1) / e.currentTarget?.clientHeight));
      }}
      ref={slideWrapperRef}
    >
      <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={3} />
      {/* <Section className="first"></Section>
      <Section className="second"></Section>
      <Section className="third"></Section> */}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: start;

  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }
`
const Section = styled.div`
  width: 100dvw;
  height: 90dvh;
  flex-shrink: 0;

  scroll-snap-align: start;
  scroll-snap-stop: always !important;

  background-color: whitesmoke;
`
const IndicatorWrapper = styled.div`
  position: fixed;
  right: 0;
  height: 100dvh;
  width: 100px;
  width: 10dvw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 18px;
    height: 18px;
    border-radius: 18px;
/* 
    background-color: rgb(var(--lightGrey2)); */
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.2);

    margin: 12px;
  }

  /* .current {
    background-color: rgb(var(--point3)) !important;
    background-color: darkgrey !important;
  } */

  @media (max-width: 479px) { //mobile port
    width: 15dvw;
    div{
      width: 14px;
      height: 14px;
      border-radius: 14px;
      margin: 8px;
    }
  }
`
