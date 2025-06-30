

import HabitInputView from "@/common/components/views/HabitInputView";
import { getHabitById_Prefetch } from "@/common/fetchers/habitPrefetch";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

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
    queryFn: () => getHabitById_Prefetch({ id: habitId }),
  });

  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitInputView isEdit={true} habitId={habitId} />
    </HydrationBoundary>
  );
}

export default Page;