import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

//function
import { getDiaryByDate } from "@/common/fetchers/diary";
import { getMonthlyHabitsStatus } from "@/common/fetchers/habit";
import { getTodayString } from "@/common/functions/getTodayString";
import CalendarView from "./CalendarView.client";

interface Props {
  searchParams: {
    date: string
  };
}

const CalendarPage = async ({ searchParams }: Props) => {

  const params = searchParams;
  // date는 'yyyy-MM-dd' string
  const date = params?.date || getTodayString();

  //server prefetch
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['diary', 'calendar', date],
    queryFn: () => getDiaryByDate({ date }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habit', 'month', date.slice(0, 7)], // 'yyyy-MM-dd'에서 'yyyy-MM' 추출
    queryFn: () => getMonthlyHabitsStatus({ month: date.slice(0, 7) }),
  })


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CalendarView date={date} />
    </HydrationBoundary>
  );
}

export default CalendarPage;