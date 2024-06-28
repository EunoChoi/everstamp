import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { auth } from "@/auth";
import HabitPageClient from "./_component/HabitPageClient";
import { getHabits_fetch } from "../../_lib/habit_ssr";

const Page = async ({ searchParams }: any) => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';

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
      <HabitPageClient email={email} />
    </HydrationBoundary>
  );
}

export default Page;