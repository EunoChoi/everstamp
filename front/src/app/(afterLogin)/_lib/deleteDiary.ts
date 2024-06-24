import Axios from "@/Aixos/aixos";

interface Props {
  diaryId: string | number;
}

export async function deleteDiary({ diaryId }: Props) {

  const { data } = await Axios.delete(`diary?diaryId=${diaryId}`);
  if (!data) {
    console.log('Failed to delete data!!');
    throw new Error('Failed to delte data')
  }

  return data;
}