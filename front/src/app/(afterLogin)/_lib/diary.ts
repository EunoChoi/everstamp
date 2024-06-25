import Axios from "@/Aixos/aixos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IdProps {
  id: string | number | null;
}

interface DateProps {
  date: number;
}

interface ListProps {
  sort: string;
  search: string;
}


export async function getDiary({ id }: IdProps) {
  if (!id) return null;
  const { data } = await Axios.get(`/diary/id/${id}`);
  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }
  return data;
}


interface AddDiaryProps {
  date: Date;
  text: string;
  images: string[];
}
export async function addDiary({ date, text, images }: AddDiaryProps) {

  const test = useMutation({
    mutationFn: async () => await Axios.post('/diary', { date, text, images }),
    onSuccess: async () => {
      console.log('다이어리 생성 완료');
      const queryClient = useQueryClient();
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
    },
    onError: () => {
      console.log('다이어리 생성 중 오류 발생');
    }
  })

  test.mutate();

  return;
}


export async function deleteDiary({ id }: IdProps) {
  return useMutation({
    mutationFn: async () => await Axios.delete(`diary?id=${id}`),
    onSuccess: () => {
      console.log('다이어리 삭제 완료');
      const queryClient = useQueryClient();
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
      // ["diary","calendar","다이어리 날짜"] 삭제 후 이 쿼리키에 해댱하는 데이터 업데이트 되어야함 
      // 굳이 서버에서 받아올 필요 없이 데이터를 비워 버리자
    },
    onError: () => {
      console.log('다이어리 삭제 중 오류 발생');
    }
  });
}


export async function getDiary_date({ date }: DateProps) {
  const { data } = await Axios.get(`/diary/calendar?date=${date}`);
  if (!data) {
    console.log('no diary in this day');
    throw new Error('no diary in this day')
  }

  return data;
}

export async function getDiaries({ sort, search }: ListProps) {
  const { data } = await Axios.get(`/diary/list?search=${search}&sort=${sort}`)

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}