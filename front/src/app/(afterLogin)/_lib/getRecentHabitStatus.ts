import Axios from "@/Aixos/aixos";

// const { email, id, date } = req.query;

interface Props {
  id: number;
  date: number;
}

export async function getRecentHabitStatus({ id, date }: Props) {
  const { data } = await Axios.get(`/habit/recent?id=${id}&date=${date}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}