

import HabitInputModal from "@/app/(routes)/app/(withLayout)/habit/_components/HabitInputModal";
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
      <HabitInputModal isEdit={true} habitId={habitId} />
    </HydrationBoundary>
  );
}

export default Page;