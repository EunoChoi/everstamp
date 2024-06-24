import Axios from "@/Aixos/aixos";

interface Props {
  id: string | null;
}

export async function getDiaryById({ id }: Props) {

  if (!id) return null;
  const { data } = await Axios.get(`/diary/id/${id}`);
  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}