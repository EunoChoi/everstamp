import ListPageClient from "./_component/ListPageClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDiaries_fetch } from "../../../_lib/diary_ssr";

const Page = async () => {
  //server prefetch
  const queryClient = new QueryClient();

  //prefetch list data - all emotion and all sort
  for (let i = 0; i <= 5; i++) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['diary', 'list', 'search', i, 'ASC'],
      queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'ASC', search: i, limit: 5, pageParam }),
      initialPageParam: 0,
    })
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['diary', 'list', 'search', i, 'DESC'],
      queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'DESC', search: i, limit: 5, pageParam }),
      initialPageParam: 0,
    })
  };


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListPageClient />
    </HydrationBoundary>
  );
}

export default Page;
