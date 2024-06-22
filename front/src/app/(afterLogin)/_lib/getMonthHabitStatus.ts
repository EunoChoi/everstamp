import Axios from "@/Aixos/aixos";

// const { email, id, date } = req.query;

export async function getMonthHabitStatus(email: string) {
  const { data } = await Axios.get(`/habit/month?email=${email}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}