import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export async function getCurrentUser_fetch() {

  const { data } = await Axios.get(`/user/current`, {
    headers: {
      cookie: cookies().toString(),
    },
  });
  if (!data) {

    console.log('user data prefetch error');
  }
  return data;
}