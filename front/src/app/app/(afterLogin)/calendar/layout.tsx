import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { getDiary_date_fetch } from "../../../../common/function/fetch/diary_ssr";
import { getHabit_status_month_fetch } from "../../../../common/function/fetch/habit_ssr";

//function
import { getCleanTodayTime } from "@/common/function/getCleanTodayTime";
import CalendarPage from "./page";


interface Props {
  searchParams: {
    date: string
  };
}


const Page = async ({ searchParams }: Props) => {

  const params = searchParams;
  const date = Number(params?.date) ? Number(params?.date) : getCleanTodayTime();

  //server prefetch
  const queryClient = new QueryClient();
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
      <CalendarPage date={date} />
    </HydrationBoundary>
  );
}

export default Page;