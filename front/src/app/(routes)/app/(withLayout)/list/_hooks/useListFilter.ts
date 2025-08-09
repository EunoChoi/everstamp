import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export type LIST_QUERY_SORT = 'asc' | 'desc';

export const useListFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setListFilter = useCallback((query: {
    sort?: LIST_QUERY_SORT;
    year?: number;
    month?: number;
    yearAndMonth?: string;
    emotion?: number;
    open?: boolean;
  }) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    // console.log('setListFilter 요청 : ', query);

    //Object.entries를 이용해서 객체를 순회
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) { //value가 undefined인 경우 쿼리 스트링에서 쿼리 파라미터 삭제
        currentParams.delete(key);
      } else { //쿼리 스트링에 쿼리 파라미터 추가
        currentParams.set(key, String(value));
      }
    })

    router.push(`${pathname}?${currentParams.toString()}`);
  }, [pathname, router, searchParams])

  return {
    setListFilter
  };
}