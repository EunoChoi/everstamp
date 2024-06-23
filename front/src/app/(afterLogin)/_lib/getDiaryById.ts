import Axios from "@/Aixos/aixos";


export async function getDiaryById(id: string | null) {

  if (!id) return null;
  const { data } = await Axios.get(`/diary/id/${id}`);
  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}