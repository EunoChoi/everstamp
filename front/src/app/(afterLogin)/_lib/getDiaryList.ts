import Axios from "@/Aixos/aixos";

export async function getDiaryList(sort: string, search: string) {
  const { data } = await Axios.get(`/diary/list?search=${search}&sort=${sort}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}