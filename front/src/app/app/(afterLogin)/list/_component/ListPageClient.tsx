'use client';

import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { format, getYear } from "date-fns";

//style
import $Common from "@/common/style/common";

//function
import { getCurrentUser } from "@/common/function/fetch/user";
import { getDiaries } from "@/common/function/fetch/diary";


//icon
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

import { useRouter } from "next/navigation";
import ContentArea from "@/common/component/ContentArea";
import Diary from "@/common/component/diary/Diary";
import Header from "@/common/component/Header";
import EmotionSelection from "@/common/component/list/EmotionSelection";
import MonthSelector from "@/common/component/list/MonthSelector";
import ScrollToTopButton from "@/common/component/list/ScrollToTopButton";



interface ImageProps {
  id: string;
  src: string;
}

interface Habit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  priority: number;
}


interface diaryData {
  email: string;
  id: number;
  date: Date;
  text: string;
  emotion: number;
  Images: Array<ImageProps>;
  Habits: Array<Habit>;
  visible: boolean;
};

interface User {
  email: string;
}

const ListPageClient = () => {

  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  });

  const { data: user = { email: '' } } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

  let temmDate = '';
  const limit = 10; //get diary limit

  const userEmail: string = user.email ? user.email : '';
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [selectedYear, setSelectedYear] = useState<number>(getYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [monthSelectorOpen, setMonthSelectorOpen] = useState<boolean>(false);

  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>(() => {
    const localData = localStorage.getItem(userEmail)
    if (localData) {
      const jsonLocalData = JSON.parse(localData);
      return jsonLocalData['listSortType'] ? jsonLocalData['listSortType'] : 'DESC';
    }
    else return 'DESC';
  });
  const [emotionToggle, setEmotionToggle] = useState<number>(5);


  const { data: diaries, fetchNextPage, isFetching, hasNextPage, isSuccess } = useInfiniteQuery({
    queryKey: ['diary', 'list', 'emotion', emotionToggle, 'sort', sortToggle, 'year', selectedYear, 'momth', selectedMonth],
    queryFn: ({ pageParam }) => getDiaries({
      sort: sortToggle,
      search: emotionToggle,
      pageParam,
      limit,
      selectedYear: selectedYear,
      selectedMonth: selectedMonth
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage?.length === 0 ? undefined : allPages?.length),
  });

  const sortToggleChange = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (sortToggle === 'DESC') setSortToggle('ASC');
      else setSortToggle('DESC');
    }, 50);
  }, [sortToggle])


  useEffect(() => {
    const localData = localStorage.getItem(userEmail)
    let jsonLocalData;
    if (localData) {
      jsonLocalData = JSON.parse(localData);
    }

    localStorage.setItem(userEmail, JSON.stringify({ ...jsonLocalData, listSortType: sortToggle }));
  }, [userEmail, sortToggle])

  useEffect(() => {
    if (user && !isFetching && hasNextPage && inView) fetchNextPage();
  }, [inView, hasNextPage, isFetching])

  //production mode에서만 동작, 정적 자료만 prefetch
  useEffect(() => {
    router.prefetch('/app/calendar');
    router.prefetch('/app/habit');
    router.prefetch('/app/setting');
  }, [])


  return (
    <$Common.Wrapper>
      <Header title='list'>
        <$Common.Options>
          <button onClick={() => { setMonthSelectorOpen(c => !c); }}>
            {(selectedMonth !== 0)
              ? <span>{selectedYear}.{selectedMonth}</span> : <CalendarMonthRoundedIcon className="calIcon" fontSize="inherit" />}
          </button>
          <button onClick={sortToggleChange} className='type2'>
            {/* <span><SortIcon fontSize="small" /></span> */}
            <span>{sortToggle === 'DESC' ? 'New' : 'Old'}</span>
          </button>
        </$Common.Options>
      </Header>
      <ContentArea className="scroll" _ref={contentRef}>
        <MonthSelector
          contentRef={contentRef}
          monthSelectorOpen={monthSelectorOpen}
          selectedMonth={selectedMonth}
          setMonthSelectorOpen={setMonthSelectorOpen}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
        />
        <EmotionSelection
          contentRef={contentRef}
          emotionToggle={emotionToggle}
          setEmotionToggle={setEmotionToggle} />
        {diaries?.pages[0]?.length > 0 ?
          diaries?.pages?.map((page: Array<diaryData>, i: number) => (page?.map((data, i) => {
            const diaryDate = format(data.date, 'MMMM yyyy');
            if (temmDate !== diaryDate) {
              temmDate = diaryDate;
              return <React.Fragment key={'listNote' + i}>
                <MonthInfo className={`Month${i}`}><span>{diaryDate}</span></MonthInfo>
                <Diary
                  position="list"
                  diaryData={data}
                />
              </React.Fragment>
            }
            else {
              return <Diary
                key={'listNote' + i}
                position="list"
                diaryData={data}
              />
            }
          })))
          :
          <NoDiaries>일기 목록이 존재하지 않습니다. 🥹</NoDiaries>}
        <Observer ref={ref} />
      </ContentArea>
      <ScrollToTopButton contentRef={contentRef} />
    </$Common.Wrapper>
  );
}

export default ListPageClient;

const MonthInfo = styled.span`
  margin-top: 32px;
  margin-bottom: 32px;
  

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 2px;
  background-color:  ${(props) => props.theme.point ? props.theme.point + '35' : '#979FC7'};

  &.Month0{
    display:none;
  }

  span{
    padding: 0 8px;
    background-color: white;
    color:  ${(props) => props.theme.point ? props.theme.point + 'a0' : '#979FC7'};
    font-size: 16px;
    font-weight: 500;
  }

  
  @media (max-width: 479px) { //mobile port
    width: 90dvw;
  }

  @media (min-width:1024px) { //desktop
    font-size: 22px;
    margin-top: 60px;
    margin-bottom: 30px;
  }
`

const Observer = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 50px;
`
const NoDiaries = styled.div`
  display: flex;
  align-items: center;

  padding-top: 30dvh;
  font-size: 18px;  
  font-weight: 500;
  color: rgb(var(--greyTitle));

  @media (min-width:1024px) { //desktop
    font-size: 22px;
  }
`