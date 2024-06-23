import Axios from "@/Aixos/aixos";

export async function getMonthStatus(date: Date) {
  const { data } = await Axios.get(`/habit/month?date=${date.getTime()}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}