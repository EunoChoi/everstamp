import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "@/Axios/axios";
import { enqueueSnackbar } from "notistack";
import { useCustomRouter } from "@/common/function/customRouter";

interface HabitProps {
  habitId?: string | null;
  habitName: string;
  priority: number;
}

interface Err {
  response: {
    data: string;
  }
}

const useSubmitHabit = () => {
  const router = useCustomRouter();
  const queryClient = useQueryClient();

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
  const handleError = (e: Err, message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
    console.log(e?.response);
  }

  const addHabit = useMutation({
    mutationFn: ({ habitName, priority }: HabitProps) => Axios.post('/habit', { habitName, priority }),
    onSuccess: () => {
      handleSuccess('습관 항목 생성 완료');
    },
    onError: (e: Err) => {
      handleError(e, '습관 항목 생성 실패');
    },
  });
  const editHabit = useMutation({
    mutationFn: ({ habitId, habitName, priority }: HabitProps) => Axios.patch('/habit', { habitId, habitName, priority }),
    onSuccess: () => {
      handleSuccess('습관 항목 수정 완료');
    },
    onError: (e: Err) => {
      handleError(e, '습관 항목 수정 실패');
    },
  });

  return { addHabit, editHabit };
}

export default useSubmitHabit;