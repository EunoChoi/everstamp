import Axios from "@/Aixos/aixos";

interface Props {
  email: string;
  diaryId: string | number;
}

export async function deleteDiary({ email, diaryId }: Props) {

  const { status } = await Axios.delete(`diary?email=${email}&diaryId=${diaryId}`);
  console.log(status);
  if (!status) {
    console.log('Failed to delete data!!');
    throw new Error('Failed to delte data')
  }

  return status;
}