import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

//function
import { getDiaryByDate, getMonthlyDiaryData } from "@/common/fetchers/diary";
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
    queryKey: ['diary', 'date', date],
    queryFn: () => getDiaryByDate({ date }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['diary', 'month', date.slice(0, 7)], // 'yyyy-MM-dd'에서 'yyyy-MM' 추출
    queryFn: () => getMonthlyDiaryData({ month: date.slice(0, 7) }),
  })


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CalendarView date={date} />
    </HydrationBoundary>
  );
}

export default CalendarPage;