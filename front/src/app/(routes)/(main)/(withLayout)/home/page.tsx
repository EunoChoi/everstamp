import { getYear } from "date-fns";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/fetchers/stats";
import HomeView from "./HomeView.client";

const HomePage = async () => {
  const queryClient = new QueryClient();
  const currentYear = getYear(new Date());

  await queryClient.prefetchQuery({
    queryKey: ['stats', 'years'],
    queryFn: getAvailableYears,
  });

  await queryClient.prefetchQuery({
    queryKey: ['stats', 'diary', currentYear],
    queryFn: () => getDiaryStats({ year: currentYear }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['stats', 'habit', currentYear],
    queryFn: () => getHabitStats({ year: currentYear }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeView />
    </HydrationBoundary>
  );
};

export default HomePage;
