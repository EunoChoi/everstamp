import { getCurrentUser_Prefetch } from "@/common/fetchers/userPrefetch";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";


type Props = {
  children: ReactNode;
}

const PrefetchUserDataProvider = async ({ children }: Props) => {

  const queryClient = new QueryClient();

  //for login status check
  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser_Prefetch,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      {children}
    </HydrationBoundary>
  );
}

export default PrefetchUserDataProvider;