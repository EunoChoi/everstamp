import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

interface IdProps {
  id: string | number | null;
}
interface DateProps {
  date: number;
}
interface ListProps {
  sort: string;
  search: number;
  pageParam: number,
  limit: number,
}


export async function getDiary_fetch({ id }: IdProps) {
  try {
    console.log('diary(id) data prefetching...');
    const { data } = await Axios.get(`/diary/id/${id}`, {
      headers: {
        cookie: cookies().toString(),
      },
    });
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to fetch diary(id) data!!');
  }
}



export async function getDiary_date_fetch({ date }: DateProps) {
  try {
    console.log('diary(date) data prefetching...');
    const { data } = await Axios.get(`/diary/calendar?date=${date}`, {
      headers: {
        cookie: cookies().toString(),
      },
    });
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to fetch diary(date) data!!');
  }
}


export async function getDiaries_fetch({ sort, search, pageParam, limit }: ListProps) {
  try {
    console.log('diaries(list) data prefetching...');
    const { data } = await Axios.get(`/diary/list?search=${search}&sort=${sort}&pageParam=${pageParam}&limit=${limit}`, {
      headers: {
        cookie: cookies().toString(),
      },
    })
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to fetch diaries(list) data!!');
  }
}