'use client';

import styled from "styled-components";

//component
import Header from "@/component/header";

const Setting = () => {
  return (
    <Wrapper>
      <Header subTitle="" />
      <Content>
        <b>user info</b>
        <span>nick : euno</span>
        <span>social : kakao</span>
        <span>logout</span>
        <span>탈퇴</span>

        <b>theme</b>
        <span>point color</span>
        <span>dark theme</span>
        <span>font size</span>
      </Content>
    </Wrapper>
  );
}

export default Setting;

const Wrapper = styled.div`
  padding: 0 20px;
  width: 100%;
  max-width: 600px;
  min-width: 400px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  @media screen and (max-width: 720px) {
    min-width: 90%;
    padding: 0;
  }
`

const Content = styled.div`
  width: 100%;
  height: calc(100vh - var(--mobileHeader));
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  //mobile
  @media screen and (max-width: 720px) {
    height: calc(100vh - var(--mobileHeader) - var(--mobileNav));
    padding: 0 5vw;
  }
`