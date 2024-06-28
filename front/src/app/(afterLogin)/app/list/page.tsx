import ListPageClient from "./_component/ListPageClient";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { auth } from "@/auth";
import { getDiaries_fetch } from "../../_lib/diary_ssr";

const Page = async () => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';

  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', '', 'ASC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'ASC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', '', 'DESC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'DESC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListPageClient />
    </HydrationBoundary>
  );
}

export default Page;
