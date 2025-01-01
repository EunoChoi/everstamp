import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "@/Axios/axios";
import { enqueueSnackbar } from "notistack";

interface Err {
  response: {
    data: string;
  }
}
interface CheckHabitProps {
  habitId: number;
  date: number;
}


const useHabitAction = () => {
  const queryClient = useQueryClient();
  const checkHabit = useMutation({
    mutationFn: ({ habitId, date }: CheckHabitProps) => Axios.post('/habit/check', { habitId, date }),
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll()
        .filter(cache => Array.isArray(cache.queryKey) && cache.queryKey[2] === 'recent')
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
    mutationFn: ({ habitId, date }: CheckHabitProps) => Axios.delete('/habit/check', { data: { habitId, date } }), //delete method data
    onSuccess: () => {
      const queryCache = queryClient.getQueryCache();
      queryCache.getAll()
        .filter(cache => Array.isArray(cache.queryKey) && cache.queryKey[2] === 'recent')
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
    mutationFn: async ({ habitId }: { habitId: number }) => await Axios.delete(`habit?habitId=${habitId}`),
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