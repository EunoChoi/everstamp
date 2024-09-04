import HabitInfoModal from "@/component/modal/HabitInfoModal";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getHabit_fetch } from "@/function/fetch/habit_ssr";

interface Props {
  searchParams: {
    id: string
  };
}

const Page = async ({ searchParams }: Props) => {
  const queryClient = new QueryClient();

  const params = searchParams;
  let habitId = params.id;

  await queryClient.prefetchQuery({
    queryKey: ['habits', 'id', habitId],
    queryFn: () => getHabit_fetch({ id: habitId }),
  });

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitInfoModal habitId={habitId} />
    </HydrationBoundary>
  );
}

export default Page;