import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

export async function getCurrentUser_prefetch() {
  const { data } = await Axios.get(`/user/current`, {
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