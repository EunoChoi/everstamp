'use client';

import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";


//styledComponent
import SC_Common from "@/style/common";

import { getDiaries } from "@/app/(afterLogin)/_lib/diary";

//component
import Diary from "@/component/diary/Diary";
import Header from "@/component/common/Header";

//icon
import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SortIcon from '@mui/icons-material/Sort';

import { useInView } from "react-intersection-observer";
import { format } from "date-fns";
import ContentArea from "@/component/common/ContentArea";

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


const ListPageClient = () => {

  const contentRef = useRef<HTMLDivElement>(null);
  let temmDate = '';
  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>('DESC');
  const [emotionToggle, setEmotionToggle] = useState<number>(5);
  const emotions = [
    'angry',
    'sad',
    'common',
    'happy',
    'joyful',
    'all',
  ];


  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  });

  const { data: diaries, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: ['diary', 'list', 'search', emotionToggle, sortToggle],
    queryFn: ({ pageParam }) => getDiaries({ sort: sortToggle, search: emotionToggle, pageParam, limit: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.length === 0 ? undefined : allPages.length),
  });


  const emotionToggleChange = () => {
    setEmotionToggle(c => (c + 1) % 6)
    setTimeout(() => {
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };
  const sortToggleChange = useCallback(() => {
    if (sortToggle === 'DESC') setSortToggle('ASC');
    else setSortToggle('DESC');

    setTimeout(() => {
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  }, [sortToggle])


  useEffect(() => {
    if (!isFetching && hasNextPage && inView) fetchNextPage();
  }, [inView, hasNextPage, isFetching])




  return (
    <SC_Common.Wrapper>
      <Header title='list'>
        <SC_Common.Options>
          <button onClick={emotionToggleChange}>{emotions[emotionToggle]}</button>
          <button onClick={sortToggleChange}>
            <span><SortIcon fontSize="small" /></span>
            <span>{sortToggle === 'DESC' ? 'New' : 'Old'}</span>
          </button>
        </SC_Common.Options>
      </Header>


      <ContentArea className="scroll" _ref={contentRef}>
        {diaries?.pages[0].length === 0 && <NoDiaries>일기 작성을 시작해볼까요? 😀</NoDiaries>}
        {diaries?.pages?.map((page: Array<diaryData>, i: number) => (page.map((data, i) => {
          const diaryDate = format(data.date, 'MMMM yyyy');
          if (temmDate !== diaryDate) {
            temmDate = diaryDate;
            return <React.Fragment key={'listNote' + i}>
              <MonthInfo><span>{diaryDate}</span></MonthInfo>
              <Diary
                position="list"
                diaryData={data}
              />
            </React.Fragment>
          }
          else {
            return <Diary
              position="list"
              diaryData={data}
              key={'listNote' + i}
            />
          }
        })))}
        <Observer ref={ref} />
      </ContentArea>
    </SC_Common.Wrapper>
  );
}

export default ListPageClient;

const MonthInfo = styled.span`
  margin-top: 40px;
  margin-bottom: 20px;
  

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 2px;
  background-color:  ${(props) => props.theme.point ? props.theme.point + '50' : '#979FC7'};

  span{
    padding: 0 8px;
    background-color: white;
    color:  ${(props) => props.theme.point ? props.theme.point + '70' : '#979FC7'};
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