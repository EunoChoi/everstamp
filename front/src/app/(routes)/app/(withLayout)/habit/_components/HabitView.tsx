'use client';

import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from 'notistack';
import styled from "styled-components";



import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import TopButtons from "@/common/components/ui/TopButtons";
import { getHabits } from "@/common/fetchers/habit";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import { useCustomHabitOrder } from "../_hooks/useCustomHabitOrder";
import { useHabitToggle } from "../_hooks/useHabitToggle";
import { useTodayHabitRate } from "../_hooks/useTodayHabitRate";
import HabitBox from "./HabitBox";

interface Habit {
  id: number;
  name: string;
  priority: number;
}

const MAX_HABIT_COUNT = 20;
const DUMMY_COUNT = 12;

type SORT = 'ASC' | 'DESC' | 'PRIORITY' | 'CUSTOM';
const SORT_TEXT: Record<SORT, string> = {
  ASC: 'old',
  DESC: 'new',
  PRIORITY: '★',
  CUSTOM: 'custom'
}

const HabitView = () => {
  usePrefetchPage();
  const router = useRouter();
  const { todayDoneHabitCount, createdHabitCount, todayDoneHabitRate } = useTodayHabitRate();
  const { toggleValue, onToggle } = useHabitToggle();
  const { customOrder } = useCustomHabitOrder();

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', toggleValue],
    queryFn: () => getHabits({ sort: toggleValue, customOrder }),
  });

  const onAddHabit = () => {
    if (habits && habits.length >= MAX_HABIT_COUNT) enqueueSnackbar(`습관은 최대 ${MAX_HABIT_COUNT}개 생성 가능합니다.`, { variant: 'info' })
    else router.push('/app/inter/input/addHabit', { scroll: false })
  }


  return (
    <PageWrapper>
      <TopButtons>
        <button onClick={onAddHabit} className="small">
          <AddIcon fontSize="small" />
        </button>
        <button onClick={onToggle} className={toggleValue === 'CUSTOM' ? 'large' : 'normal'} >
          <span>{SORT_TEXT[toggleValue]}</span>
        </button>
      </TopButtons>

      <ContentWrapper>
        <HabitPageTextWrapper>
          <HabitPageText className='title'>{todayDoneHabitRate}% Done, Today</HabitPageText>
          <HabitPageText className='sub'>오늘의 목표 습관 {createdHabitCount}개중 {todayDoneHabitCount}개를 실천하셨습니다 :)</HabitPageText>
        </HabitPageTextWrapper>

        <HabitBoxs>
          {habits?.map((habit: Habit) => <HabitBox key={habit.id} id={habit.id} name={habit.name} priority={habit.priority} />)}
          {habits?.length < MAX_HABIT_COUNT && <EmptyBox onClick={onAddHabit}><AddIcon fontSize='inherit' color='inherit' /></EmptyBox>}
          {Array.from({ length: DUMMY_COUNT }).map((_, index) => (<div key={index}></div>))}
        </HabitBoxs>
      </ContentWrapper>
    </PageWrapper >
  );
}

export default HabitView;

const HabitPageTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  margin-top: 16px;
  margin-bottom: 28px;
  gap: 8px;
`
const HabitPageText = styled.span`
  &.title{
    color: rgb(var(--greyTitle));
    width: 100%;

    font-size: 32px;
    font-family: 'BMJUA';
    @media (min-width:1025px) { //desktop
      font-size: 36px;
    }
  }
  &.sub{
    font-size: 18px;
    color: grey;
  }
`


const HabitBoxs = styled.div`
  width: 100%;
  height: auto;
  flex-shrink: 0;

  display : grid;
  grid-template-rows: auto;
  
  gap: 8px;
  row-gap: 8px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr) ;
  }
  @media (min-width:721px) and (max-width:1023px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  @media (min-width:1024px) { 
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`
const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 0.85;
  
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  border: 2px solid ${(props) => props.theme.themeColor ? props.theme.themeColor + 70 : '#979FC7'};
  color: ${(props) => props.theme.themeColor ? props.theme.themeColor + 70 : '#979FC7'};
  font-size: 48px;
`