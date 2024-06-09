'use client';

import styled from "styled-components";

//component
import Header from "@/component/header";
import HabitBox from "@/component/habitBox";

const Habit = () => {
  return (
    <Wrapper>
      <Header subTitle="complete 100%" />
      <Content>
        <HabitGrid>
          <HabitBox />
          <HabitBox />
          <HabitBox />

          <HabitBox />
          <HabitBox />
          <HabitBox />
        </HabitGrid>
      </Content>
    </Wrapper>
  );
}

export default Habit;
const HabitGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 8px;
  }
`

const Wrapper = styled.div`
  padding: 0 20px;  

  width: 100%;
  max-width: 800px;
  min-width: 400px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  @media screen and (max-width: 720px) {
    min-width: 90%;
    padding : 0;
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


