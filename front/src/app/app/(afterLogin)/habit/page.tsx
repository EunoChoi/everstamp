import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HabitPageClient from "./_component/HabitPageClient";
import { getHabits_fetch } from "../../../../function/fetch/habit_ssr";

const Page = async ({ searchParams }: any) => {
  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['habits', 'list', 'ASC'],
    queryFn: () => getHabits_fetch({ sort: 'ASC' }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habits', 'list', 'DESC'],
    queryFn: () => getHabits_fetch({ sort: 'DESC' }),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitPageClient />
    </HydrationBoundary>
  );
}

export default Page;