import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDiaryCalendar } from "../../_lib/getDiaryCalendar";
import { auth } from "@/auth";
import CalendarPageClient from "./_component/CalendarPageClient";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { getMonthStatus } from "../../_lib/getMontStatus";
import { format, addMonths, subMonths } from "date-fns";

const Page = async ({ searchParams }: any) => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';
  const params = searchParams;
  let date = Number(params.date);

  //server prefetch
  const queryClient = new QueryClient();
  if (!date) date = getCleanTodayTime();

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'calendar', email, format(date, 'yyMMdd')],
    queryFn: () => getDiaryCalendar(email, date),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habit', 'month', format(date, 'MM')],
    queryFn: () => getMonthStatus(email, new Date(date)),
  })


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CalendarPageClient email={email} date={date} />
    </HydrationBoundary>
  );
}

export default Page;