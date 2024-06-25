import Axios from "@/Aixos/aixos";

interface IdProps {
  id: string | null;
}
interface ListProps {
  sort: string;
}
interface RecentProps {
  id: number;
  date: number;
}
interface MonthProps {
  date: Date;
}


export async function getHabit({ id }: IdProps) {

  const { data } = await Axios.get(`habit?id=${id}`);
  if (!data) {
    console.log('Failed to delete data!!');
    throw new Error('Failed to delte data')
  }

  return data;
}

export async function getHabits({ sort }: ListProps) {
  const { data } = await Axios.get(`/habit/list?sort=${sort}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}

export async function getHabit_status_4day({ id, date }: RecentProps) {
  const { data } = await Axios.get(`/habit/recent?id=${id}&date=${date}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}



export async function getHabit_status_month({ date }: MonthProps) {
  const { data } = await Axios.get(`/habit/month?date=${date.getTime()}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}
