import Axios from "@/Aixos/aixos";

interface Props {
  diaryId: string | number;
}

export async function deleteDiary({ diaryId }: Props) {

  const { status } = await Axios.delete(`diary?diaryId=${diaryId}`);
  console.log(status);
  if (!status) {
    console.log('Failed to delete data!!');
    throw new Error('Failed to delte data')
  }

  return status;
}