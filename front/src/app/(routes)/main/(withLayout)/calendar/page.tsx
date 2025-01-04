import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { getDiaryByDate_Prefetch } from "../../../../../common/fetchers/diaryPrefetch";
import { getAllHabitsMonthInfo_Prefetch } from "../../../../../common/fetchers/habitPrefetch";

//function
import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import CalendarView from "./_components/CalendarView";


interface Props {
  searchParams: {
    date: string
  };
}

//page for data prefetching 
const DataPrefetchingPage = async ({ searchParams }: Props) => {

  const params = searchParams;
  const date = Number(params?.date) ? Number(params?.date) : getCleanTodayTime();

  //server prefetch
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['diary', 'calendar', format(date, 'yyMMdd')],
    queryFn: () => getDiaryByDate_Prefetch({ date }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habit', 'month', format(date, 'MM')],
    queryFn: () => getAllHabitsMonthInfo_Prefetch({ date: new Date(date) }),
  })


  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CalendarView date={date} />
    </HydrationBoundary>
  );
}

export default DataPrefetchingPage;