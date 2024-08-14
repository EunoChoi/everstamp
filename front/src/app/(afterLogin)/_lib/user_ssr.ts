import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser_fetch() {
  try {
    const { data } = await Axios.get(`/user/current`, {
      headers: {
        cookie: cookies().toString(),
      },
    });
    return data;
  } catch (e: any) {
    if (!navigator.onLine) {
      // 오프라인 상태인 경우 오프라인 페이지로 이동
      redirect('/offline');
    }

    console.error(e.response.data);
    throw new Error('Failed to get user(current) data!!');
  }
}