import { addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";

export interface CellDateValue {
  dateObject: Date;
  dateString: string;
}

const makeCalendarDates = (displayDate: Date) => {
  const startDateOfMonth = startOfMonth(displayDate); //1~31
  const endDateOfMonth = endOfMonth(displayDate); //1~31
  const startDateOfWeek = startOfWeek(startDateOfMonth, { weekStartsOn: 1 });//일요일 시작 기준이라 월요일 시작 기준으로 처리 필요
  const endDateOfWeek = endOfWeek(endDateOfMonth, { weekStartsOn: 1 });

  let date = startDateOfWeek;
  const calendarDates: Array<Array<CellDateValue>> = [[]];


  while (date <= endDateOfWeek) {
    const weeksIndex = calendarDates.length - 1;
    const dateString = format(date, 'yyyy-MM-dd');
    calendarDates[weeksIndex].push({ dateObject: date, dateString });
    if (calendarDates[weeksIndex].length === 7) {
      calendarDates.push([]);
    }
    date = addDays(date, 1);
  }
  calendarDates.pop();

  return { calendarDates };
}

export default makeCalendarDates;