import Axios from "@/Aixos/aixos";

export async function getAllHabits(sort: string) {
  const { data } = await Axios.get(`/habit?sort=${sort}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}