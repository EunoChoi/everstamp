import { getDiary_fetch } from "@/function/fetch/diary_ssr";
import EditDiaryModal from "@/component/modal/diary/EditDiaryModal";
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
    queryFn: () => getDiary_fetch({ id: diaryId }),
  });

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <EditDiaryModal diaryId={diaryId} />
    </HydrationBoundary>
  );
}

export default Page;