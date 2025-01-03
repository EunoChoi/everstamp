

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getHabit_fetch } from "@/common/fetchers/habit_ssr";
import HabitInputModal from "@/app/(routes)/main/(withLayout)/habit/_components/HabitInputModal";

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
      <HabitInputModal isEdit={true} habitId={habitId} />
    </HydrationBoundary>
  );
}

export default Page;