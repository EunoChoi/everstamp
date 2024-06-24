import ListPageClient from "./_component/ListPageClient";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDiaryList } from "../../_lib/getDiaryList";
import { auth } from "@/auth";
import { getDiaryList_prefetch } from "../../_lib/getDiaryList_prefetch";

const Page = async () => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';

  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'list', 'search', '', 'ASC'],
    queryFn: () => getDiaryList_prefetch({ sort: 'ASC', search: '' }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['diary', 'list', 'search', '', 'DESC'],
    queryFn: () => getDiaryList_prefetch({ sort: 'DESC', search: '' }),
  })


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListPageClient email={email} />
    </HydrationBoundary>
  );
}

export default Page;
