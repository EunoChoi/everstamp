'use client';

import styled from "styled-components";

//component
import Header from "@/component/header";

const Setting = () => {
  return (
    <Wrapper>
      <Header subTitle="" />
    </Wrapper>
  );
}

export default Setting;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 16vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  &{
    @media screen and (max-width: 1080px) {
      padding: 0 12vw;
    }
    @media screen and (max-width: 720px) {
      padding: 0;
    }
  }
`