'use client';

import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

//style
import $Common from "@/common/styles/common";


//function
import { getCurrentUser } from "@/common/fetchers/user";
//icon
import CommonBody from "@/common/components/layout/CommonBody";
import TopButtons from "@/common/components/layout/TopButtons";
import { getHabits } from "@/common/fetchers/habit";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import AddIcon from '@mui/icons-material/Add';
import HabitsCarousel from "./HabitsCarousel";



const HabitView = () => {
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

  const { data: habits } = useQuery({
    queryKey: ['habits', 'list', sortToggle],
    queryFn: () => getHabits({ sort: sortToggle, customOrder }),
  });

  // useEffect(() => {
  //   console.log('habits fetch')
  // }, [habits])


  const onAddHabit = () => {
    if (habits && habits.length >= 18) enqueueSnackbar('습관은 최대 18개 생성 가능합니다.', { variant: 'info' })
    else router.push('/app/inter/input/addHabit', { scroll: false })
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


  //production mode에서만 동작, 정적 자료만 prefetch
  useEffect(() => {
    router.prefetch('/app/calendar');
    router.prefetch('/app/list');
    router.prefetch('/app/setting');
  }, [])


  return (
    <$Common.Wrapper className="habit">
      <TopButtons classname="habit" >
        <$Common.Options>
          <button onClick={onAddHabit} className="small">
            <AddIcon fontSize="small" />
          </button>
          <button onClick={sortChage} className={sortToggle === 'CUSTOM' ? 'large' : 'normal'}>
            <span>{SORT_TEXT[sortToggle]}</span>
          </button>
        </$Common.Options>
      </TopButtons>
      <HabitBody>
        <HabitsCarousel habits={habits} onAddHabit={onAddHabit} />
      </HabitBody>
    </$Common.Wrapper>
  );
}

export default HabitView;

const HabitBody = styled(CommonBody)`
  width: 100%;
  height: 100%;

  padding-top: var(--mobileHeader);
  @media (min-width:1024px) { //desktop
    padding-top: var(--desktopHeader);
  }
`
