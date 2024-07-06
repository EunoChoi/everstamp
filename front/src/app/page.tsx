'use client';

import Image from "next/image";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation'

import tree from '../../public/img/tree.png';

//hooks
import IsMobile from "@/function/IsMobile";

//image

const App = () => {
  const router = useRouter()
  const isMobile = IsMobile();



  return (
    <Wrapper>
      <Section>
        <Logo>
          <span>ever</span>
          <span>stamp</span>
        </Logo>
        <TextWrapper>
          <span>일기와 습관을 한곳에서 기록하며</span>
          <span>당신의 변화와 성장을 기록해보세요.</span>
        </TextWrapper>
        <Image src={tree} alt="tree" width={100} height={100}></Image>
      </Section>
      <Section bgcolor="white">
        <span>웹에서 바로 가능, pwa으로도 사용 가능</span>
        <Buttons>
          <button>PWA으로 사용</button>
          <button>웹에서 사용</button>
        </Buttons>
      </Section>
      <Section bgcolor="#979FC750">

      </Section>
    </Wrapper>
  );
}

export default App;

const Buttons = styled.div`
  display: flex;

  button{
    font-size: 16px;
    color: rgb(var(--greyTitle));
    background-color: #979FC7;

    border-radius : 100px;
    padding: 4px 16px;
    margin : 0 4px;
  }
`

const Section = styled.section < { bgcolor?: string }> `
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 64px;

  &.space-evenly{justify-content: space-evenly}

  background-color: #979FC7;

  background-color: ${(props) => props.bgcolor !== null && props.bgcolor};
`
const Logo = styled.div`
  display: flex;
  span {
    line-height: 1;
    display: block;
    font-size: 20px;
    text-transform: uppercase;
    color: rgb(var(--greyTitle));
    font-weight: 600;
    padding: 0 2px;

    &:first-letter {
      color: white;
    }    
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin : 48px 0;
  width: 100vw;
  span{
    line-height: 1.2;
    color: rgb(var(--greyTitle));
    font-size: 20px;
    font-weight: 500;
  }
`
const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  /* scroll-snap-type: y mandatory; */
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }
`
