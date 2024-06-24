import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

interface Props {
  sort: string;
}

export async function getHabitList_prefetch({ sort }: Props) {
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