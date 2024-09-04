import Axios from "@/Axios/axios";

interface IdProps {
  id: string | null;
}
interface ListProps {
  sort: string;
  customOrder?: number[];
}
interface RecentProps {
  id: number;
  date: number;
}
interface MonthProps {
  date: Date;
}


export async function getHabit({ id }: IdProps) {
  try {
    const { data } = await Axios.get(`habit?id=${id}`);
    return data;
  }
  catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habit(id) data!!');
  }
}

export async function getHabits({ sort, customOrder }: ListProps) {
  try {
    const params = {
      sort,
      customOrder
    };
    const { data } = await Axios.get(`/habit/list`, { params });
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(list) data!!');
  }
}

export async function getHabit_status_4day({ id, date }: RecentProps) {
  try {
    const { data } = await Axios.get(`/habit/recent?id=${id}&date=${date}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(4day) data!!');
  }

}
export async function getHabit_status_month({ date }: MonthProps) {
  try {
    const { data } = await Axios.get(`/habit/month?date=${date.getTime()}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(all month) data!!');
  }
}

export async function getHabit_single_status_month({ id, date }: { id: string | null, date: Date }) {
  try {
    const { data } = await Axios.get(`/habit/month/single?id=${id}&date=${date.getTime()}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(info month) data!!');
  }
}

export async function getHabit_single_status_year({ id, date }: { id: string | null, date: Date }) {
  try {
    const { data } = await Axios.get(`/habit/year/single?id=${id}&date=${date.getTime()}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(info year) data!!');
  }
}
