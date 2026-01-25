import Api from "@/api/Api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

interface Err {
  response: {
    data: string;
  }
}
interface CheckHabitProps {
  habitId: number;
  date: string; // 'yyyy-MM-dd'
}


const useHabitAction = () => {
  const queryClient = useQueryClient();
  const checkHabit = useMutation({
    mutationFn: ({ habitId, date }: CheckHabitProps) => Api.post('/habit/check', { habitId, date }),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll()
        .filter(cache => Array.isArray(cache.queryKey) && cache.queryKey[0] === 'habit')
        .forEach(cache => {
          queryClient.invalidateQueries({ queryKey: cache.queryKey });
        });
      console.log('chack habit success');
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.response?.data, { variant: 'error' })
      console.log('uncheck habit error');
    },
  });
  const uncheckHabit = useMutation({
    mutationFn: ({ habitId, date }: CheckHabitProps) => Api.delete('/habit/check', { data: { habitId, date } }), //delete method data
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll()
        .filter(cache => Array.isArray(cache.queryKey) && cache.queryKey[0] === 'habit')
        .forEach(cache => {
          queryClient.invalidateQueries({ queryKey: cache.queryKey });
        });
      console.log('unchack habit success');
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log('uncheck habit error');
    },
  });
  const deleteHabit = useMutation({
    mutationFn: async ({ habitId }: { habitId: number }) => await Api.delete(`habit?habitId=${habitId}`),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll().forEach(cache => {
        queryClient.invalidateQueries({ queryKey: cache.queryKey });
      });
      console.log('delete habit success');
      enqueueSnackbar('습관 항목 삭제 완료', { variant: 'success' });
    },
    onError: (e: Err) => {
      enqueueSnackbar(e?.response?.data, { variant: 'error' });
      console.log('delete habit error');
    },
  });

  return {
    checkHabit,
    uncheckHabit,
    deleteHabit
  };
}

export default useHabitAction;