import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

interface DateProps {
  date: number;
}
interface ListProps {
  sort: string;
  search: string;
  pageParam: number,
  limit: number,
}

export async function getDiary_date_fetch({ date }: DateProps) {
  const { data } = await Axios.get(`/diary/calendar?date=${date}`, {
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!data) {
    console.log('no diary in this day');
    throw new Error('no diary in this day')
  }

  return data;
}


export async function getDiaries_fetch({ sort, search, pageParam, limit }: ListProps) {
  const { data } = await Axios.get(`/diary/list?search=${search}&sort=${sort}&pageParam=${pageParam}&limit=${limit}`, {
    headers: {
      cookie: cookies().toString(),
    },
  })

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}