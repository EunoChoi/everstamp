import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getHabits_fetch } from "../../../../common/function/fetch/habit_ssr";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  searchParams: {
    date: string
  };
}

const Layout = async ({ children, searchParams }: Props) => {
  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['habits', 'list', 'ASC'],
    queryFn: () => getHabits_fetch({ sort: 'ASC' }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['habits', 'list', 'DESC'],
    queryFn: () => getHabits_fetch({ sort: 'DESC' }),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      {children}
    </HydrationBoundary>
  );
}

export default Layout;