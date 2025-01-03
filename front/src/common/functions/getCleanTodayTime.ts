export function getCleanTodayTime() {
  const tempDate = new Date();
  return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime();
}