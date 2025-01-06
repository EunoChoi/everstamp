'use client';

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { format, getYear } from "date-fns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

//style
import $Common from "@/common/styles/common";

//function
import { getDiariesAtList } from "@/common/fetchers/diary";
import { getCurrentUser } from "@/common/fetchers/user";


//icon
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

import EmotionSelection from "@/app/(routes)/app/(withLayout)/list/_components/EmotionSelectorAtList";
import MonthSelector from "@/app/(routes)/app/(withLayout)/list/_components/MonthSelectorAtList";
import CommonBody from "@/common/components/layout/CommonBody";
import Header from "@/common/components/layout/Header";
import Diary from "@/common/components/ui/Diary";
import ScrollToTopButton from "@/common/components/ui/ScrollToTopButton";
import { useRouter } from "next/navigation";



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

const ListView = () => {

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
    queryFn: ({ pageParam }) => getDiariesAtList({
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
            <span>{sortToggle === 'DESC' ? 'New' : 'Old'}</span>
          </button>
        </$Common.Options>
      </Header>
      <Listbody _ref={contentRef}>
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
            const diaryDate = format(data.date, 'yy. MM');
            if (temmDate !== diaryDate) {
              temmDate = diaryDate;
              return <React.Fragment key={'listNote' + i}>
                <MonthInfo className={`Month${i}`}><span>{diaryDate}</span></MonthInfo>
                <DiaryWrapper><Diary type="small" diaryData={data} /></DiaryWrapper>
              </React.Fragment>
            }
            else return <DiaryWrapper key={'listNote' + i}><Diary type="small" diaryData={data} /></DiaryWrapper>
          })))
          :
          <NoDiaries>일기 목록이 존재하지 않습니다. 🥹</NoDiaries>}
        <Observer ref={ref} />
      </Listbody>
      <ScrollToTopButton contentRef={contentRef} />
    </$Common.Wrapper>
  );
}

export default ListView;

const DiaryWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
`
const Listbody = styled(CommonBody)`
  @media (max-width: 479px) { //mobile port
    padding : 0 4dvw;
  }
`
const MonthInfo = styled.span`
  margin-top: 32px;
  margin-bottom: 32px;
  

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 1px;
  background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  filter: brightness(110%) saturate(50%);

  &.Month0{
    display:none;
  }

  span{
    background-color: white;
    line-height: 1px;
    padding: 0 8px;
    color:  ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    font-size: 16px;
    font-weight: 500;
  }

  
  @media (max-width: 479px) { //mobile port
    width: 90dvw;
  }

  @media (min-width:1024px) { //desktop
    font-size: 22px;
    margin-top: 45px;
    margin-bottom: 45px;
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