import { ReactNode } from "react";
import RQProvider from "@/component/common/RQProvider";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCurrentUser_fetch } from "./_lib/user_ssr";


type Props = {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  //server prefetch
  const queryClient = new QueryClient();

  //for login status check
  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser_fetch,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <RQProvider>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </RQProvider>
  );
}

export default Layout;