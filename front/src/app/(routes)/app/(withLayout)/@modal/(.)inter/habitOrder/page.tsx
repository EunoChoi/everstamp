
import { HabitOrderView } from "@/common/components/views/HabitOrderView";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const Page = async () => {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitOrderView />
    </HydrationBoundary>
  );
}

export default Page;