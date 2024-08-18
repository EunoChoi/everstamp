import Axios from "@/Axios/axios";
import { redirect } from "next/navigation";

interface IdProps {
  id: string | number | null;
}

interface DateProps {
  date: number;
}

interface ListProps {
  sort: string;
  search: number;
  limit: number;
  pageParam: number;
  selectedMonth: number;
  selectedYear: number;
}

export async function getDiary({ id }: IdProps) {
  try {
    if (!id) return null;
    const { data } = await Axios.get(`/diary/id/${id}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to fetch diary(id) data!!');
  }
}

export async function getDiary_date({ date }: DateProps) {
  try {
    const { data } = await Axios.get(`/diary/calendar?date=${date}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to fetch diary(date) data!!');
  }
}

export async function getDiaries({ sort, search, pageParam, limit, selectedMonth, selectedYear }: ListProps) {
  try {
    const { data } = await Axios.get(`/diary/list?search=${search}&sort=${sort}&pageParam=${pageParam}&limit=${limit}&selectedMonth=${selectedMonth}&selectedYear=${selectedYear}`)
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to fetch diaries(list) data!!');
  }
}