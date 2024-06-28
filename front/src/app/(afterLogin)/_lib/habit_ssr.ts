import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

interface Props {
  sort: string;
}
interface DateProps {
  date: Date;
}


export async function getHabits_fetch({ sort }: Props) {
  const { data } = await Axios.get(`/habit/list?sort=${sort}`, {
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}


export async function getHabit_status_month_fetch({ date }: DateProps) {
  const { data } = await Axios.get(`/habit/month?date=${date.getTime()}`, {
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}