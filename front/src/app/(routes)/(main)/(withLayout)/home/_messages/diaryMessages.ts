export const getDiaryMainMessage = (year: number, totalDiaries: number): string => {
  if (totalDiaries === 0) {
    return '아직 기록이 없어요. 오늘부터 시작해볼까요?';
  }
  return '';
};
