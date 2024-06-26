import Axios from "@/Aixos/aixos";

interface IdProps {
  id: string | number | null;
}

interface DateProps {
  date: number;
}

interface ListProps {
  sort: string;
  search: string;
}


export async function getDiary({ id }: IdProps) {
  if (!id) return null;
  const { data } = await Axios.get(`/diary/id/${id}`);
  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }
  return data;
}

export async function getDiary_date({ date }: DateProps) {
  const { data } = await Axios.get(`/diary/calendar?date=${date}`);
  if (!data) {
    console.log('no diary in this day');
    throw new Error('no diary in this day')
  }

  return data;
}

export async function getDiaries({ sort, search }: ListProps) {
  const { data } = await Axios.get(`/diary/list?search=${search}&sort=${sort}`)

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}