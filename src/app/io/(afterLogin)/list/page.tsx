'use client';

import styled from "styled-components";


//component
import Header from "@/component/header";
import ListNote from "@/component/ListNote";


const List = () => {
  return (
    <Wrapper>
      <Header subTitle="24.04.12" />
      <ScrollContent>
        <ListNote></ListNote>
        <ListNote></ListNote>
        <ListNote></ListNote>
        <ListNote></ListNote>
        <ListNote></ListNote>
        <ListNote></ListNote>
        <ListNote></ListNote>
        <ListNote></ListNote>
      </ScrollContent>
    </Wrapper>
  );
}

export default List;

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
    padding : 0;
  }
`

const ScrollContent = styled.div`
  width: 100%;
  height: calc(100vh - var(--mobileHeader));
  scrollbar-width: none;
  
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: scroll;

  //mobile
  @media screen and (max-width: 720px) {
    height: calc(100vh - var(--mobileHeader) - var(--mobileNav));
    padding: 0 5vw;
  }
`
