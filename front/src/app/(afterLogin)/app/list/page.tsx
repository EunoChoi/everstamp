import ListPageClient from "./_component/ListPageClient";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDiaryList } from "../../_lib/getDiaryList";
import { auth } from "@/auth";

const Page = async () => {

  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';

  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'list', 'ASC'],
    queryFn: () => getDiaryList(email, 'ASC')
  })
  await queryClient.prefetchQuery({
    queryKey: ['diary', 'list', 'DESC'],
    queryFn: () => getDiaryList(email, 'DESC')
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ListPageClient email={email} />
    </HydrationBoundary>
  );
}

export default Page;
