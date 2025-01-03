import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDiaries_fetch } from "../../../../../common/fetchers/diary_ssr";
import { ReactNode } from "react";
import ListView from "./_components/ListView";

//page for data prefetch
const DataPrefetchingPage = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  const selectedYear = new Date().getFullYear();
  const limit = 10;

  //prefetch list data - all emotion and all sort
  for (let i = 0; i <= 5; i++) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['diary', 'list', 'emotion', i, 'sort', 'ASC', 'year', selectedYear, 'momth', 0],
      queryFn: ({ pageParam }) => getDiaries_fetch({
        sort: 'ASC',
        search: i,
        pageParam,
        limit,
        selectedYear: selectedYear,
        selectedMonth: 0
      }),
      initialPageParam: 0,
    })
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['diary', 'list', 'emotion', i, 'sort', 'DESC', 'year', selectedYear, 'momth', 0],
      queryFn: ({ pageParam }) => getDiaries_fetch({
        sort: 'DESC',
        search: i,
        pageParam,
        limit,
        selectedYear: selectedYear,
        selectedMonth: 0
      }),
      initialPageParam: 0,
    })
  };


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListView />
    </HydrationBoundary>
  );
}

export default DataPrefetchingPage;
