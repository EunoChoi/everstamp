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


import EventIcon from '@mui/icons-material/Event';
import emotion0 from '/public/img/emotion/emotion0.png';
import emotion1 from '/public/img/emotion/emotion1.png';
import emotion2 from '/public/img/emotion/emotion2.png';
import emotion3 from '/public/img/emotion/emotion3.png';
import emotion4 from '/public/img/emotion/emotion4.png';

import ListFilter from "@/app/(routes)/app/(withLayout)/list/_components/ListFilter";
import CommonBody from "@/common/components/layout/CommonBody";
import Header from "@/common/components/layout/Header";
import Diary from "@/common/components/ui/Diary";
import ScrollToTopButton from "@/common/components/ui/ScrollToTopButton";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";



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

const ListView = (props: any) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const emotions = [emotion0, emotion1, emotion2, emotion3, emotion4];
  const EMOTION_NAME_ENG = ['angry', 'sad', 'common', 'happy', 'joyful'];

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  });

  const { data: user = { email: '' } } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

  let tempDate = '';
  const limit = 10; //get diary limit

  const userEmail: string = user.email ? user.email : '';
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [selectedYear, setSelectedYear] = useState<number>(getYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [emotionToggle, setEmotionToggle] = useState<number>(5);


  const queryParamsYear = searchParams.get('year');
  const queryParamsMonth = searchParams.get('month');
  const queryParamsEmotion = searchParams.get('emotion');

  useEffect(() => {
    // console.log(year, month, emotion);
    if (queryParamsYear) setSelectedYear(Number(queryParamsYear));
    if (queryParamsMonth) setSelectedMonth(Number(queryParamsMonth));
    if (queryParamsEmotion) setEmotionToggle(Number(queryParamsEmotion));
  }, [queryParamsYear, queryParamsMonth, queryParamsEmotion])


  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>(() => {
    const localData = localStorage.getItem(userEmail)
    if (localData) {
      const jsonLocalData = JSON.parse(localData);
      return jsonLocalData['listSortType'] ? jsonLocalData['listSortType'] : 'DESC';
    }
    else return 'DESC';
  });


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
      <HeaderWrapper>
        <Header title='list'>
          <$Common.Options>
            <button onClick={() => { setFilterOpen(c => !c); }} className='small'>
              {((selectedMonth !== 0) || (emotionToggle !== 5)) ? <FilterListIcon className="icon" fontSize="inherit" /> : <FilterListOffIcon className="icon" fontSize="inherit" />}
            </button>
            <button onClick={sortToggleChange} className='normal'>
              <span>{sortToggle === 'DESC' ? 'New' : 'Old'}</span>
            </button>
          </$Common.Options>
        </Header>
      </HeaderWrapper>


      {((selectedMonth !== 0) || (emotionToggle !== 5)) &&
        <FilterResult>
          <span>filtering</span>
          <span>:</span>
          {selectedMonth !== 0 && <span><EventIcon fontSize="small" color="inherit" />{selectedYear % 100}.{selectedMonth.toString().padStart(2, '0')}</span>}
          {emotionToggle !== 5 && <span><Image src={emotions[emotionToggle]} alt='emotion image' width={24} height={24} />{EMOTION_NAME_ENG[emotionToggle]}</span>}
        </FilterResult>}

      <Listbody _ref={contentRef}>
        <ListFilter
          contentRef={contentRef}
          isFilterOpen={isFilterOpen}
          setFilterOpen={setFilterOpen}

          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
          setEmotionToggle={setEmotionToggle}
        />

        {diaries?.pages[0]?.length > 0 ?
          diaries?.pages?.map((page: Array<diaryData>, i: number) => (page?.map((data, i) => {
            const diaryDate = format(data.date, 'yy.MM');
            if (tempDate !== diaryDate) {
              tempDate = diaryDate;
              return <React.Fragment key={'listNote' + i}>
                <MonthInfo className={`Month${i}`}><span>{diaryDate}</span></MonthInfo>
                <DiaryWrapper><Diary type="large" diaryData={data} /></DiaryWrapper>
              </React.Fragment>
            }
            else return <DiaryWrapper key={'listNote' + i}><Diary type="large" diaryData={data} /></DiaryWrapper>
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

const HeaderWrapper = styled.div`
  width: auto;
  @media (max-width: 479px) { //mobile port
    width: 100%;
  }
  @media (min-width:1024px) { //desktop
    position: fixed;
    top: 0;
  }
`
const FilterResult = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding : 6px 0;
  gap : 12px;
  background-color:${(props) => props.theme.point ? props.theme.point + '25' : '#979FC7'};
  color:${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  filter: saturate(150%) contrast(95%);

  @media (min-width:1024px) { //desktop
    padding: 12px 0;
    background-color: rgb(252, 252, 252);
    filter: none;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 75dvw;
  }

  span{
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    /* font-weight: 500; */
    text-transform: capitalize;
    line-height: 0;
  }
`
const DiaryWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
`
const Listbody = styled(CommonBody)`
  max-width: 500px;
  @media (max-width: 479px) { //mobile port
    padding : 14px 4dvw;
  }
  @media (min-width:1024px) { //desktop
    padding-top: 72px;
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
  background-color: ${(props) => props.theme.point ? props.theme.point + '50' : '#979FC7'};

  &.Month0{
    display:none;
  }

  span{
    background-color: white;
    line-height: 1px;
    padding: 0 8px;
    color:  ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    font-size: 14px;
  }

  
  @media (max-width: 479px) { //mobile port
    width: 90dvw;
  }

  @media (min-width:1025px) { //desktop
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
  /* font-weight: 500; */
  color: rgb(var(--greyTitle));

  @media (min-width:1025px) { //desktop
    font-size: 22px;
  }
`