import Axios from "@/Aixos/aixos";

interface Props {
  id: string | null;
}

export async function deleteHabitById({ id }: Props) {

  const { data } = await Axios.delete(`habit?id=${id}`);
  if (!data) {
    console.log('Failed to delete data!!');
    throw new Error('Failed to delte data')
  }

  return data;
}