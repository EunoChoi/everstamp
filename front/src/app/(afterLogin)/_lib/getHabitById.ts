import Axios from "@/Aixos/aixos";

interface Props {
  id: string | null;
}

export async function getHabitById({ id }: Props) {

  const { data } = await Axios.get(`habit?id=${id}`);
  if (!data) {
    console.log('Failed to delete data!!');
    throw new Error('Failed to delte data')
  }

  return data;
}