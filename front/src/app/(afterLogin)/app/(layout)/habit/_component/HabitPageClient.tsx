'use client';

import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from 'notistack'

//style
import SC_Common from "@/style/common";

//component
import HabitBox from "@/component/habit/HabitBox";
import Header from "@/component/common/Header";
import Indicator from "@/component/common/indicator";
import ContentArea from "@/component/common/ContentArea";

//function
import { getHabits } from "@/app/(afterLogin)/_lib/habit";

//icon
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';


const HabitPageClient = () => {

  const router = useRouter();
  const gridListScrollRef = useRef<HTMLDivElement>(null);

  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>('DESC');
  const [page, setPage] = useState<number>(0);

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortToggle],
    queryFn: () => getHabits({ sort: sortToggle }),
  });


  const onAddHabit = () => {
    if (habits.length < 18) router.push('/app/inter/input/addHabit', { scroll: false })
    else enqueueSnackbar('습관은 최대 18개 생성 가능합니다.', { variant: 'info' })
  }
  const sortChage = useCallback(() => {
    if (sortToggle === 'DESC') setSortToggle('ASC');
    else setSortToggle('DESC');
  }, [sortToggle])


  return (
    <SC_Common.Wrapper className="habit">
      <Header title='habit' classname="habit" >
        <SC_Common.Options>
          <button onClick={onAddHabit}>
            <AddIcon fontSize="small" />
          </button>
          <button onClick={sortChage}>
            <span><SortIcon fontSize="small" /></span>
            <span>{sortToggle === 'DESC' ? 'New' : 'Old'}</span>
          </button>
        </SC_Common.Options>
      </Header>
      <ContentArea className="habit">
        {(habits === undefined || habits?.length === 0) ?
          <NoHabit>습관 목록이 존재하지 않습니다. 🥹</NoHabit>
          :
          <HabitsSliderWrapper>
            <HabitsSlider
              onScroll={(e) => {
                setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
              }}
            >
              {habits?.map((grid: any[], i: number) =>
                <HabitsSliderPage key={'page' + i}>
                  <HabitGridContainer>
                    {grid.map(e =>
                      <HabitBox key={e.email + e.name} name={e.name} id={e.id} priority={e.priority} />
                    )}
                    {grid.length !== 6 && [...Array(6 - grid.length)].map((_, i) =>
                      <EmptyHabitBox key={'emptyBox' + i} onClick={onAddHabit}><AddIcon fontSize="inherit" /></EmptyHabitBox>)}
                  </HabitGridContainer>
                </HabitsSliderPage>
              )}
            </HabitsSlider>
            {habits?.length > 1 && <Indicator slideWrapperRef={gridListScrollRef} page={page} indicatorLength={habits?.length} />}
          </HabitsSliderWrapper>}
      </ContentArea>
    </SC_Common.Wrapper>
  );
}

export default HabitPageClient;

const EmptyHabitBox = styled.div`
  border-radius: 16px;
  border: 2px solid rgba(0,0,0,0.05);

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: rgba(0,0,0,0.1);
`
const HabitsSliderWrapper = styled.div`
  &.hide{
    transition: all ease-in-out 100ms;
    opacity: 0;
  }

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`

const HabitsSlider = styled.div`
  position: relative;

  width: 100%;
  
  display:  flex;
  overflow-y: hidden;
  overflow-x: scroll;
  
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }

  max-height: calc(100% - 28px); //indicator height 28px
`
const HabitsSliderPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  flex-shrink: 0;
`
const HabitGridContainer = styled.div`
  display: grid;
  scroll-snap-align: center;
  scroll-snap-stop: always !important;

  flex-shrink: 0;
  width: auto;  

  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  


  @media (max-width: 479px) { //mobile port
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  @media (min-width:480px) and (max-width:1023px) { //tablet
    @media (orientation: portrait){
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }
`

const NoHabit = styled.span`
  width: 100%;
  height: 100%;

  padding-top: 30dvh;

  font-size: 18px;  
  font-weight: 500;
  text-align: center;
  color: rgb(var(--greyTitle));

  @media (min-width:1024px) { //desktop
    font-size: 22px;
  }
`
