import { getTodayHabitStat } from "@/common/fetchers/habit";
import { useQuery } from "@tanstack/react-query";

export const useTodayHabitRate = () => {
  const { data: todayHabit } = useQuery({
    queryKey: ['habit', 'today', 'stat'],
    queryFn: getTodayHabitStat,
  })
  const todayDoneHabitCount = todayHabit?.todayDoneHabits ?? 0;
  const createdHabitCount = todayHabit?.createdHabits ?? 0;
  const todayDoneHabitRate = createdHabitCount !== 0 ? Math.round((todayDoneHabitCount / createdHabitCount) * 100) : '';

  return {
    todayDoneHabitCount,
    createdHabitCount,
    todayDoneHabitRate
  };
}