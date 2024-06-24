

import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

interface Props {
  sort: string;
  search: string;
}

export async function getDiaryList_prefetch({ sort, search }: Props) {
  const { data } = await Axios.get(`/diary/list?search=${search}&sort=${sort}`, {
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