'use client';

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

//styledComponent
import SC_Common from "@/styleComponent/common";

//component
import Header from "@/component/header";
import HabitBox from "@/component/habitBox";

//icon
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';

const Habit = () => {
  const gridListRef = useRef<HTMLDivElement>(null);

  const [sortToggle, setSortToggle] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const pageLength = 3;
  const indicatorArr = new Array(pageLength).fill(0);

  return (
    <SC_Common.Wrapper className="habit">
      <Header />
      <SC_Common.Options>
        <button>
          <SortIcon fontSize="small" />
          <span onClick={() => setSortToggle(c => !c)}>{sortToggle ? 'A - Z' : 'Z - A'}</span>
        </button>
        <button>
          <AddIcon fontSize="small" />
        </button>
      </SC_Common.Options>
      <SC_Common.Content>
        <HabitGridList
          ref={gridListRef}
          onScroll={(e) => {
            setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
          }}
        >
          <HabitGrid>
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitBox />
          </HabitGrid>
          <HabitGrid>
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitBox />
          </HabitGrid>
          <HabitGrid>
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitBox />
          </HabitGrid>
        </HabitGridList>
        <IndicatoWrapper>
          {indicatorArr.map((_, i: number) =>
            <div
              key={'indicator' + i}
              className={page === i ? 'current' : ''}
              onClick={() => {
                gridListRef.current?.scrollTo({
                  left: gridListRef.current.clientWidth * i,
                  behavior: "smooth"
                })
              }} />)}
        </IndicatoWrapper>
      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default Habit;


const HabitGridList = styled.div`
  transition: all ease-in-out 0.1s;

  position: relative;
  width: 100%;
  height: auto;
  display:  flex;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
`
const HabitGrid = styled.div`
  flex-shrink: 0;
  width: 100%;
  display: grid;
  padding: 0 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;

  scroll-snap-align: start;
  scroll-snap-stop: always !important;

  @media screen and (max-width: 870px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 8px;
    padding: 0 4px;
  }
`
const IndicatoWrapper = styled.div`
  display: flex;
  margin-top: 8px;
  div {
    width: 12px;
    height: 12px;
    border-radius: 16px;
    background-color: rgb(var(--lightGrey2));
    border: 1px solid rgba(0,0,0,0.05);

    margin: 4px;
    @media screen and (max-width: 720px) {
      width: 8px;
      height: 8px;
      margin: 2px;
    }
  }
  .current {
    background-color: rgb(var(--point));
  }
`

