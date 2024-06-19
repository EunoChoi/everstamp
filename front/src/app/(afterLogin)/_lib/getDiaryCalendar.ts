import Axios from "@/Aixos/aixos";


export async function getDiaryCalendar(email: string, date: number) {
  const { data } = await Axios.get(`/diary/calendar?email=${email}&date=${date}`);
  // const { data } = await Axios.get(`/diary/list?email=${email}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}