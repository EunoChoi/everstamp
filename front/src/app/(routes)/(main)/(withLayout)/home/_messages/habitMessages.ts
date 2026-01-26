import { HabitStats } from "@/common/fetchers/stats";

export const getHabitMessage = (stats: HabitStats | undefined): string => {
  if (!stats || stats.totalCompletions === 0) {
    return '아직 완료한 습관이 없어요. 오늘부터 습관을 기록해보세요!';
  }

  const { totalCompletions, diariesWithHabits, habitCompletionDays, avgHabitsPerDiaryWithHabits, avgHabitsPerCompletionDay, totalDiaries } = stats;

  if (totalCompletions >= 100) {
    if (avgHabitsPerDiaryWithHabits >= 4) {
      return '100회 이상의 습관을 완료했고, 일기당 평균 4개 이상의 습관을 실천하고 있어요! 정말 대단해요!';
    }
    if (avgHabitsPerDiaryWithHabits >= 3) {
      return '100회 이상의 습관을 완료했어요! 꾸준한 노력이 보여요.';
    }
    return '100회 이상의 습관을 완료했어요! 계속해서 꾸준히 실천하고 있네요.';
  }

  if (totalCompletions >= 50) {
    if (avgHabitsPerDiaryWithHabits >= 4) {
      return '50회 이상의 습관을 완료했고, 일기당 평균 4개 이상의 습관을 실천하고 있어요! 훌륭해요!';
    }
    if (avgHabitsPerDiaryWithHabits >= 3) {
      return '50회 이상의 습관을 완료했어요! 좋은 습관이 만들어지고 있네요.';
    }
    return '50회 이상의 습관을 완료했어요! 꾸준히 실천하고 있어요.';
  }

  if (totalCompletions >= 20) {
    if (avgHabitsPerDiaryWithHabits >= 3) {
      return '20회 이상의 습관을 완료했고, 일기당 평균 3개 이상의 습관을 실천하고 있어요! 좋아요!';
    }
    return '20회 이상의 습관을 완료했어요! 조금씩 습관이 자리잡고 있네요.';
  }

  const habitDiaryRatio = totalDiaries > 0 ? (diariesWithHabits / totalDiaries) : 0;
  
  if (habitDiaryRatio >= 0.8 && avgHabitsPerDiaryWithHabits >= 3) {
    return '일기의 80% 이상에서 습관을 실천하고 있고, 평균 3개 이상의 습관을 완료하고 있어요! 정말 훌륭해요!';
  }

  if (habitDiaryRatio >= 0.6 && avgHabitsPerDiaryWithHabits >= 2.5) {
    return '일기의 60% 이상에서 습관을 실천하고 있어요! 꾸준한 노력이 보여요.';
  }

  if (habitCompletionDays >= 30) {
    if (avgHabitsPerCompletionDay >= 3) {
      return '30일 이상 습관을 실천했고, 하루 평균 3개 이상의 습관을 완료하고 있어요! 대단해요!';
    }
    return '30일 이상 습관을 실천했어요! 좋은 습관이 만들어지고 있네요.';
  }

  if (habitCompletionDays >= 15) {
    if (avgHabitsPerCompletionDay >= 2.5) {
      return '15일 이상 습관을 실천했고, 하루 평균 2.5개 이상의 습관을 완료하고 있어요! 좋아요!';
    }
    return '15일 이상 습관을 실천했어요! 조금씩 습관이 자리잡고 있네요.';
  }

  if (avgHabitsPerDiaryWithHabits >= 4) {
    return '일기당 평균 4개 이상의 습관을 실천하고 있어요! 정말 열심히 노력하고 있네요!';
  }

  if (avgHabitsPerDiaryWithHabits >= 3) {
    return '일기당 평균 3개 이상의 습관을 실천하고 있어요! 훌륭해요!';
  }

  if (avgHabitsPerDiaryWithHabits >= 2) {
    return '일기당 평균 2개 이상의 습관을 실천하고 있어요! 꾸준히 실천하고 있네요.';
  }

  if (totalCompletions >= 10) {
    return '습관을 꾸준히 실천하고 있어요! 조금씩 더 늘려보세요.';
  }

  return '습관 실천을 시작했어요! 작은 실천이 큰 변화를 만들어요.';
};
