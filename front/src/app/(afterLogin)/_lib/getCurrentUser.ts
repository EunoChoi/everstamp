import Axios from "@/Aixos/aixos";

export async function getCurrentUser() {
  const { data } = await Axios.get(`/user/current`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}