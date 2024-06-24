import SettingPageClient from "./_component/SettingPageClient";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../_lib/getCurrentUser";
import { auth } from "@/auth";
import { getCurrentUser_prefetch } from "../../_lib/getCurrentUser_prefetch";

const Page = async ({ isMobile }: any) => {
  console.log(isMobile);

  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';

  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user', email],
    queryFn: getCurrentUser_prefetch,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <SettingPageClient email={email} />
    </HydrationBoundary>
  );
}

export default Page;
