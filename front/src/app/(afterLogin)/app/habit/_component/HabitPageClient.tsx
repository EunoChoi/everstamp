'use client';

import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";

//styledComponent
import SC_Common from "@/style/common";
import { enqueueSnackbar } from 'notistack'

//component
import HabitBox from "@/component/HabitBox";
import Header from "@/component/Header";

//icon
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getHabits } from "@/app/(afterLogin)/_lib/habit";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import SplitscreenOutlinedIcon from '@mui/icons-material/SplitscreenOutlined';

import Indicator from "@/component/indicator";

interface Props {
  email: string;
}


const HabitPageClient = ({ email }: Props) => {

  const router = useRouter();

  const gridListRef = useRef<HTMLDivElement>(null);

  const [typeToggle, setTypeToggle] = useState<'GRID' | 'LIST'>('GRID');
  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>('ASC');
  const [page, setPage] = useState<number>(0);

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortToggle],
    queryFn: () => getHabits({ sort: sortToggle }),
  });


  const onAddHabit = () => {
    if (habits.length < 18) router.push('/app/inter/input/addHabit', { scroll: false })
    else enqueueSnackbar('습관은 최대 18개 생성 가능합니다.', { variant: 'info' })
  }
  const typeChage = useCallback(() => {
    if (typeToggle === 'GRID') setTypeToggle('LIST');
    else setTypeToggle('GRID');
  }, [typeToggle])
  const sortChage = useCallback(() => {
    if (sortToggle === 'DESC') setSortToggle('ASC');
    else setSortToggle('DESC');
  }, [sortToggle])


  return (
    <SC_Common.Wrapper className="habit">
      <Header title='habit' />
      <SC_Common.Options>
        <button onClick={onAddHabit}>
          <AddIcon fontSize="small" />
        </button>
        {/* <button onClick={typeChage}>
          {typeToggle === 'GRID' ? <WindowOutlinedIcon fontSize="small" /> : <SplitscreenOutlinedIcon fontSize="small" />}
        </button> */}
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
          {habits?.map((grid: any[], i: number) =>
            <HabitGrid key={'set' + i}>
              {grid.map(e => <HabitBox key={e.email + e.name} name={e.name} id={e.id}></HabitBox>)}
            </HabitGrid>)}
        </HabitGridList>
        <Indicator slideWrapperRef={gridListRef} page={page} indicatorLength={habits.length} />
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
    flex-shrink: 0;
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

