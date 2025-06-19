export function getCleanTodayTime() {
  return new Date().setHours(0, 0, 0, 0);
  // return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime();
}