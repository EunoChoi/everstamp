import DiaryInputView from "@/common/components/views/DiaryInputView";
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
      <DiaryInputView isEdit={true} diaryId={diaryId} />
    </HydrationBoundary>
  );
}

export default Page;