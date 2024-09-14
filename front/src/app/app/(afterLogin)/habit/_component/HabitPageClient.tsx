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
import { getHabits } from "@/function/fetch/habit";
import { getCurrentUser } from "@/function/fetch/user";
//icon
import AddIcon from '@mui/icons-material/Add';
import { useCustomRouter } from "@/function/customRouter";



const HabitPageClient = () => {

  const router = useCustomRouter();

  const SORT_TEXT = {
    'ASC': 'Old',
    'DESC': 'New',
    'CUSTOM': 'Custom'
  }

  const { data: user = { email: '' } } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

  const userEmail: string = user.email ? user.email : '';
  const gridListScrollRef = useRef<HTMLDivElement>(null);


  const [customOrder, setCustomOrder] = useState<number[]>(() => {
    const localData = localStorage.getItem(userEmail)
    if (localData) {
      const jsonLocalData = JSON.parse(localData);
      return jsonLocalData['habitCustomOrder'] ? jsonLocalData['habitCustomOrder'] : [];
    }
    else return [];
  });

  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC' | 'CUSTOM'>(() => {
    const localData = localStorage.getItem(userEmail)
    if (localData) {
      const jsonLocalData = JSON.parse(localData);
      return jsonLocalData['habitSortType'] ? jsonLocalData['habitSortType'] : 'DESC';
    }
    else return 'DESC';
  }
  );
  const [page, setPage] = useState<number>(0);

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortToggle],
    queryFn: () => getHabits({ sort: sortToggle, customOrder }),
  });


  const onAddHabit = () => {
    if (habits.length < 18) router.push('/app/inter/input/addHabit', { scroll: false })
    else enqueueSnackbar('습관은 최대 18개 생성 가능합니다.', { variant: 'info' })
  }
  const sortChage = useCallback(() => {
    if (sortToggle === 'DESC') setSortToggle('ASC');
    else if (sortToggle === 'ASC') setSortToggle('CUSTOM');
    else if (sortToggle === 'CUSTOM') setSortToggle('DESC');
  }, [sortToggle])


  useEffect(() => {
    const localData = localStorage.getItem(userEmail)
    let jsonLocalData;
    if (localData) {
      jsonLocalData = JSON.parse(localData);
    }

    localStorage.setItem(userEmail, JSON.stringify({ ...jsonLocalData, habitSortType: sortToggle }));
  }, [userEmail, sortToggle])




  return (
    <SC_Common.Wrapper className="habit">
      <Header title='habit' classname="habit" >
        <SC_Common.Options>
          <button onClick={onAddHabit} className="type1">
            <AddIcon fontSize="small" />
          </button>
          <button onClick={sortChage} className={sortToggle === 'CUSTOM' ? 'type3' : 'type2'}>
            <span>{SORT_TEXT[sortToggle]}</span>
          </button>
        </SC_Common.Options>
      </Header>
      <ContentArea>
        {(habits === undefined || habits?.length === 0) ?
          <>
            <EmtpyBox />
            <HabitGridContainer>
              {[...Array(6)].map((_, i) =>
                <EmptyHabitBox key={'emptyBox' + i} onClick={onAddHabit}><AddIcon fontSize="inherit" /></EmptyHabitBox>)}
            </HabitGridContainer>
            <EmtpyBox />
          </>
          :
          <>
            <EmtpyBox />
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
            <EmtpyBox />
          </>}
      </ContentArea>
    </SC_Common.Wrapper>
  );
}

export default HabitPageClient;

const EmtpyBox = styled.div` //for align center
  flex: 1;
`
const EmptyHabitBox = styled.div`
  border-radius: 16px;
  border: 2px solid rgba(0,0,0,0.05);

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: rgba(0,0,0,0.1);

  @media (max-width: 479px) { //mobile port
    width: calc(45dvw - 3px);
    aspect-ratio: 1;
  }
  @media (min-width:480px) and (max-width:1023px) { //tablet
    width: 160px;
    aspect-ratio: 1;
  }
  @media (min-width:480px) and (max-width:1023px) and (max-height:480px){ //mobile land only
    width: auto;
    height: 37dvh;
    aspect-ratio: 1;
  }
  @media (min-width:1024px) { //desktop
    width: 200px;
    aspect-ratio: 1;
  }
`
const HabitsSlider = styled.div`
  position: relative;

  width: 100%;
  
  display:  flex;
  flex-shrink: 0;
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
  align-items: start;

  width: 100%;
  height: auto;
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
    grid-gap: 6px;
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
