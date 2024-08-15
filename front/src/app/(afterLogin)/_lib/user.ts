import Axios from "@/Axios/axios";

export async function getCurrentUser() {
  try {
    const { data } = await Axios.get(`/user/current`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get user(current) data!!');
  }
}