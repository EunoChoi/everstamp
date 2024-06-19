'use client';

import Image from "next/image";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation'

//hooks
import IsMobile from "@/funcstion/IsMobile";

//image

const App = () => {
  const router = useRouter()
  const isMobile = IsMobile();

  const indicatorArr = new Array(3).fill(0);

  const [page, setPage] = useState<number>(0);
  const slideWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper
      onScroll={(e) => {
        setPage(Math.round((e.currentTarget?.scrollTop - 1) / e.currentTarget?.clientHeight));
      }}
      ref={slideWrapperRef}
    >
      <IndicatoWrapper>
        {indicatorArr.map((_, i: number) =>
          <div
            key={'indicator' + i}
            className={page === i ? 'current' : ''}
            onClick={() => {
              slideWrapperRef.current?.scrollTo({
                top: slideWrapperRef.current.clientHeight * i,
                behavior: "smooth"
              })
            }}
          />)}
      </IndicatoWrapper>
      <Section className="first"></Section>
      <Section className="second"></Section>
      <Section className="third"></Section>
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

  
  /* &.first{
    background-color: rgba(var(--point2),0.5);
  }
  &.second{
    scroll-snap-align: center;
    background-color: white;
  }
  &.third{
    background-color: rgb(var(--point3));
    background-color: rgba(0,0,0,0.07);
  } */
`
const IndicatoWrapper = styled.div`
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
