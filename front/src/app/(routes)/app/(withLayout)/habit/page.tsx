import { getHabits } from "@/common/fetchers/habit";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HabitView from "./_components/HabitView";


interface Props {
  searchParams: {
    date: string
  };
}

//page for data prefetch
const DataPrefetchingPage = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['habits', 'list', 'ASC'],
    queryFn: () => getHabits({ sort: 'ASC' }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habits', 'list', 'DESC'],
    queryFn: () => getHabits({ sort: 'DESC' }),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitView />
    </HydrationBoundary>
  );
}

export default DataPrefetchingPage;