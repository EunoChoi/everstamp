import Axios from "@/Aixos/aixos";

// const { email, id, date } = req.query;

export async function getMonthStatus(email: string, date: Date) {
  const { data } = await Axios.get(`/habit/month?email=${email}&date=${date.getTime()}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}