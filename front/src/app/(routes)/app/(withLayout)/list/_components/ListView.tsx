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



import ListFilter from "@/app/(routes)/app/(withLayout)/list/_components/ListFilter";
import CommonBody from "@/common/components/layout/CommonBody";
import TopButtons from "@/common/components/layout/TopButtons";
import Diary from "@/common/components/ui/Diary";
import ScrollToTopButton from "@/common/components/ui/ScrollToTopButton";
import FilterListIcon from '@mui/icons-material/FilterList';
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

  const EMOTION_NAME_ENG = ['angry', 'sad', 'common', 'happy', 'joyful'];

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  });

  const { data: user = { email: '' } } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

  const limit = 10; //get diary limit

  const userEmail: string = user.email ? user.email : '';
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [selectedYear, setSelectedYear] = useState<number>(getYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [emotionToggle, setEmotionToggle] = useState<number>(5);


  const queryParamsYear = searchParams.get('year');
  const queryParamsMonth = searchParams.get('month');
  const queryParamsEmotion = searchParams.get('emotion');

  //query params로 year, month, emotion이 존재하면 해당 값으로 초기화, hook으로 분리하자
  useEffect(() => {
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

  const hasDiaries = diaries?.pages[0]?.length > 0;
  const hasFilter = (selectedMonth !== 0 || emotionToggle !== 5);
  const flatDiaries = diaries?.pages.flat();


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
        <TopButtons>
          <$Common.Options>
            <button onClick={() => { setFilterOpen(c => !c); }} className='auto'>
              {hasFilter ? <>
                <span>filtered : </span>
                {selectedMonth !== 0 && <span> {selectedYear % 100}.{selectedMonth.toString().padStart(2, '0')}
                  {emotionToggle !== 5 && <span>,</span>}
                </span>}
                {emotionToggle !== 5 && <span> {EMOTION_NAME_ENG[emotionToggle]} </span>}
              </> : <FilterListIcon className="icon" fontSize="inherit" />}
            </button>
            <button onClick={sortToggleChange} className='normal'>
              <span>{sortToggle === 'DESC' ? 'New' : 'Old'}</span>
            </button>
          </$Common.Options>
        </TopButtons>
      </HeaderWrapper>

      <Listbody _ref={contentRef}>
        <ListFilter
          contentRef={contentRef}
          isFilterOpen={isFilterOpen}
          setFilterOpen={setFilterOpen}

          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
          setEmotionToggle={setEmotionToggle}
        />

        {hasDiaries ?
          flatDiaries?.map((data, i) => {
            const currentDiaryDate = format(data.date, 'MMMM. yyyy');
            const previousDiaryDate = i > 0 ? format(flatDiaries[i - 1].date, 'MMMM. yyyy') : '';

            if (currentDiaryDate !== previousDiaryDate) {
              return <React.Fragment key={'listNote' + i}>
                <MonthSeparator>{currentDiaryDate}</MonthSeparator>
                <DiaryWrapper>
                  <Diary type="large" diaryData={data} />
                </DiaryWrapper>
              </React.Fragment>
            }
            else {
              return <DiaryWrapper key={'listNote' + i}>
                <Diary type="large" diaryData={data} />
              </DiaryWrapper>
            }
          })
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

const DiaryWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
`

const Listbody = styled(CommonBody)`
  max-width: 500px;
  padding-top: var(--mobileHeader);
  @media (max-width: 479px) { //mobile port
    padding : 0 5dvw;
    padding-top: var(--mobileHeader);
  }
  @media (min-width:1024px) { //desktop
    padding-top: 72px;
  }
`
const MonthSeparator = styled.span`
  margin: 16px 0;

  display: flex;
  justify-content: start;
  align-items: center;

  text-transform: capitalize;
  color: rgb(var(--greyTitle));
  font-size: 28px;
  font-family: 'BMJUA';
  width: 100%;

  @media (max-width: 479px) { //mobile port
    width: 90dvw;
  }

  @media (min-width:1025px) { //desktop
    font-size: 42px;
    margin : 48px 0;
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