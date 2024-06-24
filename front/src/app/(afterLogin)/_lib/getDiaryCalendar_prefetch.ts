import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

interface Props {
  date: number;
}

export async function getDiaryCalendar_prefetch({ date }: Props) {
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