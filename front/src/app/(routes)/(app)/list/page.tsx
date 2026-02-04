import { getDiaryList } from "@/common/fetchers/diary";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ListView from "./ListView.client";

//page for data prefetch
const ListPage = async () => {
  const queryClient = new QueryClient();
  const selectedYear = new Date().getFullYear();
  const limit = 10;

  //prefetch list data - all emotion and all sort
  for (let i = 0; i <= 5; i++) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['diary', 'list', 'emotion', i, 'sort', 'ASC', 'year', selectedYear, 'momth', 0],
      queryFn: ({ pageParam }) => getDiaryList({
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
      queryFn: ({ pageParam }) => getDiaryList({
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

export default ListPage;
