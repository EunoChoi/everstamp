import SettingPageClient from "./_component/SettingPageClient";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../_lib/getCurrentUser";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth()
  const email = session?.user?.email ? session?.user?.email : '';

  //server prefetch
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user', email],
    queryFn: () => getCurrentUser(email),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <SettingPageClient email={email} />
    </HydrationBoundary>
  );
}

export default Page;
