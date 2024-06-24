import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDiaryCalendar } from "../../_lib/getDiaryCalendar";
import { auth } from "@/auth";
import HabitPageClient from "./_component/HabitPageClient";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { getHabitList } from "../../_lib/getHabitList";
import { getRecentHabitStatus } from "../../_lib/getRecentHabitStatus";
import { getHabitList_prefetch } from "../../_lib/getHabitList_prefetch";

const Page = async ({ searchParams }: any) => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';
  const params = searchParams;

  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['habits', 'all', 'ASC'],
    queryFn: () => getHabitList_prefetch({ sort: 'ASC' }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habits', 'all', 'DESC'],
    queryFn: () => getHabitList_prefetch({ sort: 'DESC' }),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitPageClient email={email} />
    </HydrationBoundary>
  );
}

export default Page;