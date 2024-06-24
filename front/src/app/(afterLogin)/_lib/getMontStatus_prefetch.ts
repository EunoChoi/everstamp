import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

interface Props {
  date: Date;
}

export async function getMonthStatus_prefetch({ date }: Props) {
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