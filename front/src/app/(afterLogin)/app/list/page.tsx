import ListPageClient from "./_component/ListPageClient";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { auth } from "@/auth";
import { getDiaries_fetch } from "../../_lib/diary_ssr";

const Page = async () => {
  //server prefetch
  const queryClient = new QueryClient();

  //all
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 5, 'ASC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'ASC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 5, 'DESC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'DESC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })

  //0
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 0, 'ASC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'ASC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 0, 'DESC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'DESC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })

  //1
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 1, 'ASC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'ASC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 1, 'DESC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'DESC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })

  //2
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 2, 'ASC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'ASC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 2, 'DESC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'DESC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })

  //3
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 3, 'ASC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'ASC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 3, 'DESC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'DESC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })

  //4
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 4, 'ASC'],
    queryFn: ({ pageParam }) => getDiaries_fetch({ sort: 'ASC', search: '', limit: 5, pageParam }),
    initialPageParam: 0,
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['diary', 'list', 'search', 4, 'DESC'],
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
