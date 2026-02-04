import Api from "@/api/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

interface DiaryProps {
  date?: string;
  text: string;
  images: string[];
  emotion: number;
  diaryId?: string | null;
}
interface Err {
  response: {
    data: string;
  }
}


const useSubmitDiary = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addDiary = useMutation({
    mutationFn: ({ date, text, images, emotion }: DiaryProps) => Api.post('/diary', { date, text, images, emotion }),
    onSuccess: async () => {
      await handleSuccess('일기 작성 완료');
    },
    onError: (e: Err) => {
      handleError(e, '일기 작성 실패');
    }
  });
  const editDiary = useMutation({
    mutationFn: ({ text, images, diaryId, emotion }: DiaryProps) => Api.patch(`/diary?diaryId=${diaryId}`, { text, images, emotion }),
    onSuccess: async () => {
      await handleSuccess('일기 수정 완료');
    },
    onError: (e: Err) => {
      handleError(e, '일기 수정 실패');
    },
  });

  const handleError = (e: Err, message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
    console.log(e?.response);
    console.log(message);
  }
  const handleSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: ['diary'] });
    queryClient.invalidateQueries({ queryKey: ['stats'] });
    router.back();
    console.log(message);
    setTimeout(() => {
      enqueueSnackbar(message, { variant: 'success' });
    }, 300);
  }

  return { addDiary, editDiary };
}

export default useSubmitDiary;


