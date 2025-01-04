import Axios from "@/Axios/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser_Prefetch() {
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