import Axios from "@/Aixos/aixos";

interface Props {
  email: string;
  date: number;
}

export async function getDiaryCalendar({ email, date }: Props) {
  const { data } = await Axios.get(`/diary/calendar?email=${email}&date=${date}`);
  // const { data } = await Axios.get(`/diary/list?email=${email}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}