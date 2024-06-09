'use client';

import styled from "styled-components";


//component
import Header from "@/component/header";
import ListNote from "@/component/ListNote";

//icon
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';


const List = () => {
  return (
    <Wrapper>
      <Header subTitle="-" />

      <Options>
        <button className="search"><SearchIcon /></button>
        <button className="sort">
          <SortIcon />
          <span>New</span>
        </button>
      </Options>

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
  /* height: calc(100vh - var(--mobileHeader)); */
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

const Options = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: end;
  padding: 8px 0;

  @media screen and (max-width: 720px) {
    width: 90%;
  }
  .search, .sort{
    display: flex;
    align-items: center;
    border-radius : 48px;
    color: rgb(var(--grey_Title));
    background-color: rgb(var(--point));
    background-color: rgb(var(--lightGrey_CP));
    padding: 2px 16px;
    font-size: 14px;
    margin-left: 6px;
    font-weight: 500;
  }
  .sort{
    *:last-child{
      margin-left: 8px;
    }
  }
`
