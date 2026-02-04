'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

import DateFilter from "@/app/(routes)/(main)/(withLayout)/list/_components/ListFilter/DateFilter";
import EmotionFilter from "@/app/(routes)/(main)/(withLayout)/list/_components/ListFilter/EmotionFilter";
import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import ScrollToTopButton from "@/common/components/ui/ScrollToTopButton";
import TopButtons from "@/common/components/ui/TopButtons";
import { getDiaryList } from "@/common/fetchers/diary";
import { useCurrentUserEmail } from "@/common/hooks/useCurrentUserEmail";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { MdCalendarMonth, MdEmojiEmotions } from 'react-icons/md';
import { Diaries } from "./_components/Diaries";
import { useFilter } from "./_hooks/useFilter";
import { useListToggle } from "./_hooks/useListToggle";
import { diaryData } from "./_types/diaryData";

const DIDARY_FETCH_LIMIT = 10;

const ListView = () => {
  usePrefetchPage();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { currentUserEmail } = useCurrentUserEmail();
  const { ref: inViewRef, inView } = useInView({ threshold: 0, delay: 0 });

  const [isEmotionFilterOpen, setEmotionFilterOpen] = useState<boolean>(false);
  const [isDateFilterOpen, setDateFilterOpen] = useState<boolean>(false);
  const { selectedYear, selectedMonth, emotionToggle, setSelectedYear, setSelectedMonth, setEmotionToggle } = useFilter();
  const { toggleValue, sortOrderChange } = useListToggle({ ref: wrapperRef });

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
  }, [inView, hasNextPage, isFetching, currentUserEmail, fetchNextPage])

  return (
    <PageWrapper ref={wrapperRef}>
      <TopButtons>
        <button
          className='small'
          onClick={() => { setEmotionFilterOpen(c => !c); }}
        >
          <MdEmojiEmotions />
        </button>
        <button
          className='small'
          onClick={() => { setDateFilterOpen(c => !c); }}
        >
          <MdCalendarMonth />
        </button>
        <button
          className='normal'
          onClick={sortOrderChange}
        >
          <span>{toggleValue === 'DESC' ? 'New' : 'Old'}</span>
        </button>
      </TopButtons>

      <ContentWrapper>
        <EmotionFilter
          contentRef={wrapperRef}
          isOpen={isEmotionFilterOpen}
          onClose={() => setEmotionFilterOpen(false)}
          setEmotionToggle={setEmotionToggle}
        />
        <DateFilter
          contentRef={wrapperRef}
          isOpen={isDateFilterOpen}
          onClose={() => setDateFilterOpen(false)}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
        />
        {flatDiaries && <Diaries diaries={flatDiaries} />}
        <Observer ref={inViewRef} />
      </ContentWrapper>
      <ScrollToTopButton contentRef={wrapperRef} />
    </PageWrapper>
  );
}

export default ListView;

const Observer = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 50px;
`;