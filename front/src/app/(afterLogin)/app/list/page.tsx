import ListPageClient from "./_component/ListPageClient";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { auth } from "@/auth";
import { getDiaries_fetch } from "../../_lib/diary_ssr";

const Page = async () => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';

  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'list', 'search', '', 'ASC'],
    queryFn: () => getDiaries_fetch({ sort: 'ASC', search: '' }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['diary', 'list', 'search', '', 'DESC'],
    queryFn: () => getDiaries_fetch({ sort: 'DESC', search: '' }),
  })


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListPageClient />
    </HydrationBoundary>
  );
}

export default Page;
