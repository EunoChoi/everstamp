import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { auth } from "@/auth";
import CalendarPageClient from "./_component/CalendarPageClient";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { format, addMonths, subMonths } from "date-fns";
import { getDiary_date_fetch } from "../../_lib/diary_ssr";
import { getHabit_status_month_fetch } from "../../_lib/habit_ssr";

const Page = async ({ searchParams }: any) => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';
  const params = searchParams;
  let date = Number(params.date);

  //server prefetch
  const queryClient = new QueryClient();
  if (!date) date = getCleanTodayTime();

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'calendar', format(date, 'yyMMdd')],
    queryFn: () => getDiary_date_fetch({ date }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habit', 'month', format(date, 'MM')],
    queryFn: () => getHabit_status_month_fetch({ date: new Date(date) }),
  })


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CalendarPageClient date={date} />
    </HydrationBoundary>
  );
}

export default Page;