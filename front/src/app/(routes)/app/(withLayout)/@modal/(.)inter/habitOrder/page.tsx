
import HabitOrderModal from "@/app/(routes)/app/(withLayout)/setting/_components/HabitOrderModal";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const Page = async () => {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HabitOrderModal />
    </HydrationBoundary>
  );
}

export default Page;