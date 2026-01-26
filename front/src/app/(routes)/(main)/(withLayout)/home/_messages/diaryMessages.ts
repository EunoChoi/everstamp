export const getDiaryMainMessage = (year: number, totalDiaries: number): string => {
  if (totalDiaries === 0) {
    return '아직 기록이 없어요. 오늘부터 시작해볼까요?';
  }
  if (totalDiaries < 10) {
    return `${year}년, ${totalDiaries}개의 기록을 남겼어요.`;
  }
  if (totalDiaries < 50) {
    return `${year}년, ${totalDiaries}개의 소중한 기록이 쌓이고 있어요!`;
  }
  return `${year}년, ${totalDiaries}개의 기록! 정말 대단해요!`;
};
