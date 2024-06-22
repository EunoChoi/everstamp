import Axios from "@/Aixos/aixos";

// const { email, id, date } = req.query;

export async function getRecentHabitStatus(email: string, id: number, currentCleanDateTime: number) {
  const { data } = await Axios.get(`/habit/recent?email=${email}&id=${id}&date=${currentCleanDateTime}`);

  if (!data) {
    console.log('Failed to fetch data!!');
    throw new Error('Failed to fetch data')
  }

  return data;
}