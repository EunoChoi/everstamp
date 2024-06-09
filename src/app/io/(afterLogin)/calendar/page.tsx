'use client';

import styled from "styled-components";

//hooks
import IsMobile from "@/hooks/IsMobile";

//component
import Header from "@/component/header";
import MonthNote from "@/component/monthNote";

const Calendar = () => {
  const isMobile = IsMobile();
  return (
    <Wrapper>
      <Header subTitle="-" />
      <Content>
        <MonthNote />
        {/* {isMobile && } */}
      </Content>
    </Wrapper>
  );
}

export default Calendar;

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
  height: calc(100vh - var(--desktopHeader));
  
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
