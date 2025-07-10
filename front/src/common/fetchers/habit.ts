import Api from "@/api/Api";

interface IdProps {
  id: string | null | undefined;
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

export async function getTodayHabitStat() {
  try {
    const { data } = await Api.get(`habit/today`);
    return data;
  }
  catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get today habit status data!!');
  }
}

export async function getHabitById({ id }: IdProps) {
  try {
    const { data } = await Api.get(`habit?id=${id}`);
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
    const { data } = await Api.get(`/habit/list`, { params });
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(list) data!!');
  }
}

export async function getSingleHabitFourDayInfo({ id, date }: RecentProps) {
  try {
    const { data } = await Api.get(`/habit/recent?id=${id}&date=${date}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(4day) data!!');
  }

}
export async function getAllHabitsMonthInfo({ date }: MonthProps) {
  try {
    const { data } = await Api.get(`/habit/month?date=${date.getTime()}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(all month) data!!');
  }
}

export async function getSingleHabitMonthInfo({ id, date }: { id: string | null, date: Date }) {
  try {
    const { data } = await Api.get(`/habit/month/single?id=${id}&date=${date.getTime()}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(info month) data!!');
  }
}

export async function getSingleHabitYearInfo({ id, date }: { id: string | null, date: Date }) {
  try {
    const { data } = await Api.get(`/habit/year/single?id=${id}&date=${date.getTime()}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habits(info year) data!!');
  }
}
