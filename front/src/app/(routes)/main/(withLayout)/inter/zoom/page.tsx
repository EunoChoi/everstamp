
import ZoomModal from "@/common/components/modal/ZoomModal";
import { getDiaryById_Prefetch } from "@/common/fetchers/diaryPrefetch";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

interface Props {
  searchParams: {
    id: string
  };
}

const Page = async ({ searchParams }: Props) => {

  const queryClient = new QueryClient();

  const params = searchParams;
  let diaryId = params.id;

  await queryClient.prefetchQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiaryById_Prefetch({ id: diaryId }),
  });

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ZoomModal diaryId={diaryId} />
    </HydrationBoundary>
  );
}

export default Page;