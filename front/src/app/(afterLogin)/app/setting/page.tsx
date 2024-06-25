import SettingPageClient from "./_component/SettingPageClient";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCurrentUser_fetch } from "../../_lib/user_ssr";

const Page = async () => {

  //server prefetch
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser_fetch,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <SettingPageClient />
    </HydrationBoundary>
  );
}

export default Page;
