'use client';

import { getDiariesByPage } from '@/server/actions/diary.actions';
import { DiaryWithRelations } from '@/server/types';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListFilterState } from '../ListView.client';
import { PAGE_SIZE } from '../page';

interface UseInfiniteDiariesProps {
  initialDiaries: DiaryWithRelations[];
  filterState: ListFilterState;
}

export const useInfiniteDiaries = ({
  initialDiaries,
  filterState
}: UseInfiniteDiariesProps) => {

  const [diaries, setDiaries] = useState(initialDiaries);
  const [page, setPage] = useState(initialDiaries?.length === 0 ? 1 : 2);
  const [hasMore, setHasMore] = useState(initialDiaries?.length === PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);

  const { ref: loaderRef, inView } = useInView();

  const sort = filterState.sort;
  const year = filterState.year;
  const month = filterState.month;
  const emotion = filterState.emotion;
  const open = filterState.open;
  const yearAndMonth = filterState.yearAndMonth;

  const loadMoreDiaries = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await getDiariesByPage({ page, pageSize: PAGE_SIZE, sort, emotion, yearAndMonth });
      const newDiaries = result.data;

      // console.log('sort order :', sort);
      // console.log('기존 diaries : ', diaries);
      // console.log('요청 page : ', page);
      // console.log('요청 diaries : ', newDiaries);
      // console.log('--------------------------------------------');

      if (result.success && newDiaries && newDiaries.length > 0) {
        setDiaries((prev) => [...prev, ...newDiaries]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("데이터 로딩 중 에러 발생", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };


  // useEffect(() => {
  //   console.log(filterState);
  // }, [filterState])


  //쿼리 파라미터가 변경되어 initialDiaries값이 변경됨, Diaries state 초기화 진행
  useEffect(() => {
    setDiaries(initialDiaries);
    setPage(2); //1페이지는 서버 컴포넌트에서 불러옴
    setHasMore(initialDiaries.length === PAGE_SIZE);
  },
    [initialDiaries])

  //InView, hasMore, isLoading state를 활용하여 데이터 로드
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreDiaries();
    }
  }, [inView, hasMore, isLoading, loadMoreDiaries]);

  return { diaries, isLoading, hasMore, loaderRef };
};