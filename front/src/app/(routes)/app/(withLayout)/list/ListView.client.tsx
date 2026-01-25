'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import ListFilter from "@/app/(routes)/app/(withLayout)/list/_components/ListFilter";
import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import ScrollToTopButton from "@/common/components/ui/ScrollToTopButton";
import TopButtons from "@/common/components/ui/TopButtons";
import { getDiaryList } from "@/common/fetchers/diary";
import { useCurrentUserEmail } from "@/common/hooks/useCurrentUserEmail";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { MdFilterList } from 'react-icons/md';
import { Diaries } from "./_components/Diaries";
import { useFilter } from "./_hooks/useFilter";
import { useListToggle } from "./_hooks/useListToggle";
import { diaryData } from "./_types/diaryData";


const EMOTION_NAME_ENG = ['angry', 'sad', 'common', 'happy', 'joyful'];
const DIDARY_FETCH_LIMIT = 10; //get diary limit

const ListView = () => {
  usePrefetchPage();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { currentUserEmail } = useCurrentUserEmail();
  const { ref: inViewRef, inView } = useInView({ threshold: 0, delay: 0 });


  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const { selectedYear, selectedMonth, emotionToggle, setSelectedYear, setSelectedMonth, setEmotionToggle } = useFilter();
  const diplayYearMonth = selectedYear % 100 + '.' + selectedMonth.toString().padStart(2, '0');
  const { toggleValue, sortOrderChange } = useListToggle({ ref: wrapperRef });
  const hasFilter = (selectedMonth !== 0 || emotionToggle !== 5);

  const { data: flatDiaries, fetchNextPage, isFetching, hasNextPage, isSuccess } = useInfiniteQuery({
    queryKey: ['diary', 'list', 'emotion', emotionToggle, 'sort', toggleValue, 'year', selectedYear, 'momth', selectedMonth],
    queryFn: ({ pageParam }) => getDiaryList({
      sort: toggleValue,
      search: emotionToggle,
      pageParam,
      limit: DIDARY_FETCH_LIMIT,
      selectedYear: selectedYear,
      selectedMonth: selectedMonth
    }),
    initialPageParam: 0,
    select: (data) => data.pages.flat() as diaryData[],
    getNextPageParam: (lastPage, allPages) => (lastPage?.length === 0 ? undefined : allPages?.length),
  });

  useEffect(() => {
    if (currentUserEmail && !isFetching && hasNextPage && inView) fetchNextPage();
  }, [inView, hasNextPage, isFetching])

  return (
    <PageWrapper ref={wrapperRef}>
      <TopButtons>
        <button
          className='auto'
          onClick={() => { setFilterOpen(c => !c); }} >
          {hasFilter ? (
            <span>
              {selectedMonth !== 0 && diplayYearMonth}
              {selectedMonth !== 0 && emotionToggle !== 5 && ' , '}
              {emotionToggle !== 5 && EMOTION_NAME_ENG[emotionToggle]}
            </span>
          ) : (
            <MdFilterList />
          )}
        </button>
        <button
          className='normal'
          onClick={sortOrderChange} >
          <span>{toggleValue === 'DESC' ? 'New' : 'Old'}</span>
        </button>
      </TopButtons>

      <ListContentWrapper>
        <ListFilter
          contentRef={wrapperRef}
          isFilterOpen={isFilterOpen}
          setFilterOpen={setFilterOpen}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
          setEmotionToggle={setEmotionToggle}
        />
        {flatDiaries && <Diaries diaries={flatDiaries} />}
        <Observer ref={inViewRef} />
      </ListContentWrapper>
      <ScrollToTopButton contentRef={wrapperRef} />
    </PageWrapper>
  );
}

export default ListView;


const ListContentWrapper = styled(ContentWrapper)`
  max-width: 600px;
`
const Observer = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 50px;
`