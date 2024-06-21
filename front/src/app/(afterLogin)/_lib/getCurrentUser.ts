import Axios from "@/Aixos/aixos";

export async function getCurrentUser(email: string | undefined) {
  const { data } = await Axios.get(`/user/current?email=${email}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}