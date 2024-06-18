import { ReactNode } from "react";
import RQProvider from "@/component/RQProvider";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


import { getCurrentUser } from "./_lib/getCurrentUser";

type Props = {
  children: ReactNode;
  modal: ReactNode;
}

const Layout = async ({ children, modal }: Props) => {

  //server
  //prefetch datas in (afterLogin) layout
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['user', 'pixel@kakao.com'],
    queryFn: getCurrentUser
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <RQProvider>
      <HydrationBoundary state={dehydratedState}>
        {modal}
        {children}
      </HydrationBoundary>
    </RQProvider>
  );
}

export default Layout;