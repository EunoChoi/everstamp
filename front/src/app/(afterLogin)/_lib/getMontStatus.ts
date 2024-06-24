import Axios from "@/Aixos/aixos";

interface Props {
  date: Date;
}

export async function getMonthStatus({ date }: Props) {
  const { data } = await Axios.get(`/habit/month?date=${date.getTime()}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}