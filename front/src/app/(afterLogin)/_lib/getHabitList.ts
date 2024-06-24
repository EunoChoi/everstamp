import Axios from "@/Aixos/aixos";

interface Props {
  sort: string;
}

export async function getHabitList({ sort }: Props) {
  const { data } = await Axios.get(`/habit/list?sort=${sort}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}