import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "@/Axios/axios";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

interface DiaryProps {
  date?: Date;
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
    mutationFn: ({ date, text, images, emotion }: DiaryProps) => Axios.post('/diary', { date, text, images, emotion }),
    onSuccess: () => {
      handleSuccess('일기 작성 완료');
    },
    onError: (e: Err) => {
      handleError(e, '일기 작성 실패');
    }
  });
  const editDiary = useMutation({
    mutationFn: ({ text, images, diaryId, emotion }: DiaryProps) => Axios.patch(`/diary?diaryId=${diaryId}`, { text, images, emotion }),
    onSuccess: () => {
      handleSuccess('일기 수정 완료');
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
    const queryCache = queryClient.getQueryCache();
    queryCache.getAll().forEach(cache => {
      queryClient.invalidateQueries({ queryKey: cache.queryKey });
    });
    router.back();
    console.log(message);
    setTimeout(() => {
      enqueueSnackbar(message, { variant: 'success' });
    }, 300);
  }

  return { addDiary, editDiary };
}

export default useSubmitDiary;


