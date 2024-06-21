import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDiaryCalendar } from "../../_lib/getDiaryCalendar";
import { auth } from "@/auth";
import CalendarPageClient from "./_component/CalendarPageClient";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";


const Page = async ({ searchParams }: any) => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';
  const params = searchParams;
  let date = Number(params.date);

  //server prefetch
  const queryClient = new QueryClient();
  if (!date) date = getCleanTodayTime();

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'calendar', email, date],
    queryFn: () => getDiaryCalendar(email, date),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CalendarPageClient email={email} date={date} />
    </HydrationBoundary>
  );
}

export default Page;