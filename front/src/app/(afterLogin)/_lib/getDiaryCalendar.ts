import Axios from "@/Aixos/aixos";

interface Props {
  date: number;
}

export async function getDiaryCalendar({ date }: Props) {
  const { data } = await Axios.get(`/diary/calendar?date=${date}`);
  // const { data } = await Axios.get(`/diary/list?email=${email}`);
  // console.log(status);
  if (!data) {
    console.log('no diary in this day');
    throw new Error('no diary in this day')
  }

  return data;
}