import Axios from "@/Aixos/aixos";
import { cookies } from "next/headers";

interface IdProps {
  id: string | null;
}
interface Props {
  sort: string;
}
interface DateProps {
  date: Date;
}


export async function getHabit_fetch({ id }: IdProps) {
  try {
    const { data } = await Axios.get(`habit?id=${id}`, {
      headers: {
        cookie: cookies().toString(),
      },
    });
    return data;
  }
  catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habit(id) data!!');
  }
}


export async function getHabits_fetch({ sort }: Props) {
  try {
    const { data } = await Axios.get(`/habit/list?sort=${sort}`, {
      headers: {
        cookie: cookies().toString(),
      },
    });
    return data;
  }
  catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(list) data!!');
  }
}
export async function getHabit_status_month_fetch({ date }: DateProps) {
  try {
    const { data } = await Axios.get(`/habit/month?date=${date.getTime()}`, {
      headers: {
        cookie: cookies().toString(),
      },
    });
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habit(month) data!!');
  }
}