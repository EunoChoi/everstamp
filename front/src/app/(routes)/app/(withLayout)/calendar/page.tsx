import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

//function
import { getDiaryByDate } from "@/common/fetchers/diary";
import { getAllHabitsMonthInfo } from "@/common/fetchers/habit";
import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import CalendarView from "./CalendarView.client";


interface Props {
  searchParams: {
    date: string
  };
}

const CalendarPage = async ({ searchParams }: Props) => {

  const params = searchParams;
  const date = Number(params?.date) ? Number(params?.date) : getCleanTodayTime();

  //server prefetch
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['diary', 'calendar', format(date, 'yyMMdd')],
    queryFn: () => getDiaryByDate({ date }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habit', 'month', format(date, 'MM')],
    queryFn: () => getAllHabitsMonthInfo({ date: new Date(date) }),
  })


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CalendarView date={date} />
    </HydrationBoundary>
  );
}

export default CalendarPage;