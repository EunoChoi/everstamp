import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDiaryCalendar } from "../../_lib/getDiaryCalendar";
import { auth } from "@/auth";
import HabitPageClient from "./_component/HabitPageClient";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { getAllHabits } from "../../_lib/getAllHabits";
import { getRecentHabitStatus } from "../../_lib/getRecentHabitStatus";

const Page = async ({ searchParams }: any) => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';
  const params = searchParams;
  console.log(email, 'dddd');

  //server prefetch
  const queryClient = new QueryClient();

  const test = await queryClient.prefetchQuery({
    queryKey: ['habits', 'all', ''],
    queryFn: () => getAllHabits(email, 'ASC'),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habits', 'all', ''],
    queryFn: () => getAllHabits(email, 'DESC'),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitPageClient email={email} />
    </HydrationBoundary>
  );
}

export default Page;