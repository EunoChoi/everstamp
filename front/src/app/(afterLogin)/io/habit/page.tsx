'use client';

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

//styledComponent
import SC_Common from "@/style/common";

//component
import HabitBox from "@/component/HabitBox";
import Header from "@/component/Header";

//icon
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';

const Habit = () => {
  const gridListRef = useRef<HTMLDivElement>(null);

  const [sortToggle, setSortToggle] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const pageLength = 3;
  const indicatorArr = new Array(pageLength).fill(0);

  const [habitDummy, setHabitDummy] = useState(new Array(9).fill(0).map((e, i) => i));
  const [habits, setHabits] = useState<any>([]);

  useEffect(() => {
    const _habits = [];
    const _habitDummy = [...habitDummy];

    while (_habitDummy.length > 0) {
      _habits.push(_habitDummy.splice(0, 6));
    }

    setHabits(_habits);
    console.log(_habits);
  }, [habitDummy]);



  return (
    <SC_Common.Wrapper className="habit">
      <Header title='habit' />
      <SC_Common.Options>
        <button>
          <SortIcon fontSize="small" />
          <span onClick={() => setSortToggle(c => !c)}>{sortToggle ? 'A - Z' : 'Z - A'}</span>
        </button>
        <button>
          <AddIcon fontSize="small" />
        </button>
      </SC_Common.Options>
      <SC_Common.Content className="habit">
        <HabitGridList
          ref={gridListRef}
          onScroll={(e) => {
            setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
          }}
        >
          {habits.length > 0 && habits.map((set: any[], i: number) => <HabitGrid key={'set' + i}>
            {set.map(e => <HabitBox key={e}></HabitBox>)}
          </HabitGrid>)}
        </HabitGridList>
        {habits.length > 0 ? <IndicatoWrapper>
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
        </IndicatoWrapper> : <span>no habit :(</span>}

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
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 60%;
    width: 90%;
  }
`
const HabitGrid = styled.div`
  flex-shrink: 0;
  width: 100%;
  display: grid;

  padding: 0 8px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 16px;

  scroll-snap-align: start;
  scroll-snap-stop: always !important;

  @media (max-width: 479px) { //mobile port
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 12px;
    padding: 0 4px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    grid-gap: 6px;
  }
  @media (orientation: portrait) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
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
    @media (max-width: 479px) { //mobile port
      width: 8px;
      height: 8px;
      margin: 2px;
    }
  }
  .current {
    background-color: rgb(var(--point));
  }
`

