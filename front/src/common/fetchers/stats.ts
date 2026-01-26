import Api from "@/api/Api";

interface YearParams {
  year: number;
}

export interface DiaryStats {
  totalCount: number;
  emotionCounts: number[];
  currentStreak: { days: number; weeks: number; months: number };
  longestStreak: { days: number; weeks: number; months: number };
  monthlyCount: number[];
  totalTextLength: number;
  monthlyEmotionCounts: number[][];
}

export interface HabitCount {
  id: number;
  name: string;
  priority: number;
  count: number;
}

export interface HabitStats {
  topHabits: HabitCount[];
  bottomHabits: HabitCount[];
  totalCompletions: number;
  diariesWithHabits: number;
  totalDiaries: number;
  habitCompletionDays: number;
  avgHabitsPerDiaryWithHabits: number;
  avgHabitsPerCompletionDay: number;
  totalHabits: number;
}

export async function getAvailableYears(): Promise<number[]> {
  try {
    const { data } = await Api.get('/stats/years');
    return data;
  } catch (e: any) {
    console.error(e.response?.data);
    throw new Error('Failed to get available years');
  }
}

export async function getDiaryStats({ year }: YearParams): Promise<DiaryStats> {
  try {
    const { data } = await Api.get(`/stats/diary/${year}`);
    return data;
  } catch (e: any) {
    console.error(e.response?.data);
    throw new Error('Failed to get diary stats');
  }
}

export async function getHabitStats({ year }: YearParams): Promise<HabitStats> {
  try {
    const { data } = await Api.get(`/stats/habit/${year}`);
    return data;
  } catch (e: any) {
    console.error(e.response?.data);
    throw new Error('Failed to get habit stats');
  }
}
