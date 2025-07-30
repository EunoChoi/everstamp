/** check isoString type correct */
export const isDateValidation = (date: string) => {
  const dateAsDate = new Date(date);
  const result = !isNaN(dateAsDate.getTime());

  return result;
}