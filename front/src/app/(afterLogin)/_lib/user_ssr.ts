import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

export async function getCurrentUser_fetch() {
  try {
    const { data } = await Axios.get(`/user/current`, {
      headers: {
        cookie: cookies().toString(),
      },
    });
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get user(current) data!!');
  }
}