import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { getDiary_date_fetch } from "../../../../function/fetch/diary_ssr";
import { getHabit_status_month_fetch } from "../../../../function/fetch/habit_ssr";

//component
import CalendarPageClient from "./_component/CalendarPageClient";

//function
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { useEffect } from "react";


interface Props {
  searchParams: {
    date: string
  };
}


const Page = async ({ searchParams }: Props) => {

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