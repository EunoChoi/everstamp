import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export async function getCurrentUser_fetch() {
  try {
    const { data } = await Axios.get(`/user/current`, {
      headers: {
        cookie: cookies().toString(),
      },
    });
    return data;
  } catch (e) {

    console.log('user data prefetch error');
    redirect('/app');
  }
}