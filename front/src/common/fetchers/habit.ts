import Api from "@/api/Api";

interface IdParams {
  id: string | null | undefined;
}
interface ListParams {
  sort: string;
  customOrder?: number[];
}
interface HabitDateParams {
  id: number;
  date: string; // 'yyyy-MM-dd'
}
interface MonthParams {
  month: string; // 'yyyy-MM'
}
interface HabitMonthParams {
  id: string | null;
  month: string; // 'yyyy-MM'
}
interface HabitYearParams {
  id: string | null;
  year: string; // 'yyyy'
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

export async function getHabitById({ id }: IdParams) {
  try {
    const { data } = await Api.get(`habit?id=${id}`);
    return data;
  }
  catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habit(id) data!!');
  }
}

export async function getHabitList({ sort, customOrder }: ListParams) {
  try {
    const params = {
      sort,
      customOrder
    };
    const { data } = await Api.get(`/habit/list`, { params });
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habit list data!!');
  }
}

export async function getHabitRecentStatus({ id, date }: HabitDateParams) {
  try {
    const { data } = await Api.get(`/habit/recent?id=${id}&date=${date}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habit recent status!!');
  }
}

export async function getMonthlyHabitsStatus({ month }: MonthParams) {
  try {
    const { data } = await Api.get(`/habit/month?month=${month}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get monthly habits status!!');
  }
}

export async function getHabitMonthlyStatus({ id, month }: HabitMonthParams) {
  try {
    const { data } = await Api.get(`/habit/month/single?id=${id}&month=${month}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habit monthly status!!');
  }
}

export async function getHabitYearlyStatus({ id, year }: HabitYearParams) {
  try {
    const { data } = await Api.get(`/habit/year/single?id=${id}&year=${year}`);
    return data;
  } catch (e: any) {
    console.error(e.response.data);
    throw new Error('Failed to get habit yearly status!!');
  }
}
