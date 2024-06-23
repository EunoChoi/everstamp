import { ReactNode } from "react";
import RQProvider from "@/component/RQProvider";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "./_lib/getCurrentUser";
import { auth } from "@/auth";


type Props = {
  children: ReactNode;
  modal: ReactNode;
}

const Layout = async ({ children, modal }: Props) => {
  const session = await auth();
  const email = session?.user?.email ? session?.user?.email : '';

  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user', email],
    queryFn: () => getCurrentUser(email),
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