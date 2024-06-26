'use client';

import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";

//styledComponent
import SC_Common from "@/style/common";

//component
import HabitBox from "@/component/HabitBox";
import Header from "@/component/Header";

//icon
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getHabits } from "@/app/(afterLogin)/_lib/habit";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

interface Props {
  email: string;
}


const HabitPageClient = ({ email }: Props) => {

  const router = useRouter();

  const gridListRef = useRef<HTMLDivElement>(null);

  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>('ASC');
  const [page, setPage] = useState<number>(0);

  const [indicator, setIndicator] = useState<Array<number>>([]);

  const [organizedHabits, setOrganizedHabits] = useState<Array<any>>([]);
  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortToggle],
    queryFn: () => getHabits({ sort: sortToggle }),
  });



  const onAddHabit = () => {
    if (habits.length < 18) router.push('/app/inter/input/addHabit', { scroll: false })
    else alert('습관은 최대 18개까지 생성 가능합니다.');
  }
  const sortChage = useCallback(() => {
    if (sortToggle === 'DESC') setSortToggle('ASC');
    else setSortToggle('DESC');
  }, [sortToggle])

  useEffect(() => {
    if (habits) {
      const organized = [];
      const tempHabits = [...habits];

      while (tempHabits.length > 0) {
        organized.push(tempHabits.splice(0, 6));
      }

      setIndicator(new Array(organized.length).fill(0));
      setOrganizedHabits(organized);
    }
  }, [habits]);

  return (
    <SC_Common.Wrapper className="habit">
      <Header title='habit' />
      <SC_Common.Options>
        <button onClick={onAddHabit}>
          <AddIcon fontSize="small" />
        </button>
        <button onClick={sortChage}>

          <span>{sortToggle === 'DESC' ?
            <ArrowUpwardOutlinedIcon fontSize="small" /> :
            <ArrowDownwardOutlinedIcon fontSize="small" />}
          </span>
          <span>Time</span>
        </button>
      </SC_Common.Options>



      <SC_Common.Content className="habit">
        {(habits === undefined || habits?.length === 0) && <NoHabit>Shall we create a list of habits? 😎</NoHabit>}
        <HabitGridList
          ref={gridListRef}
          onScroll={(e) => {
            setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
          }}
        >
          {organizedHabits?.map((grid: any[], i: number) =>
            <HabitGrid key={'set' + i}>
              {grid.map(e => <HabitBox key={e.email + e.name} name={e.name} id={e.id}></HabitBox>)}
            </HabitGrid>)}
        </HabitGridList>


        <IndicatorWrapper>
          {indicator.map((_, i: number) =>
            <div
              key={'indicator' + i}
              className={page === i ? 'current' : ''}
              onClick={() => {
                gridListRef.current?.scrollTo({
                  left: gridListRef.current.clientWidth * i,
                  behavior: "smooth"
                })
              }} />)}
        </IndicatorWrapper>

      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default HabitPageClient;

const NoHabit = styled.span`
  width: 100%;
  height: 100%;

  padding-top: 30dvh;

  font-size: 18px;  
  font-weight: 500;
  text-align: center;
  color: rgb(var(--greyTitle));

  @media (min-height:480px) and (min-width:1024px) { //desktop
    font-size: 22px;
  }
`

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
const IndicatorWrapper = styled.div`
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
    background-color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
  }
`

