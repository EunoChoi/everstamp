import Axios from "@/Aixos/aixos";

export async function getDiaryList(email: string, sort: string) {
  const { data } = await Axios.get(`/diary/list?email=${email}&sort=${sort}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}