import Axios from "@/Aixos/aixos";


export async function getDiaryCalendar(email: string, date: number) {
  const { data, status } = await Axios.get(`/diary/calendar?email=${email}&date=${date}`);
  // const { data } = await Axios.get(`/diary/list?email=${email}`);
  // console.log(status);
  if (!data) {
    console.log('no diary in this day');
    throw new Error('no diary in this day')
  }

  return data;
}