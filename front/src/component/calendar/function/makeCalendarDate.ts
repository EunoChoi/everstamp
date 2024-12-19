import { addDays, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";

const makeCalendarDate = (displayDate: Date) => {

  //displayDate를 기준으로 달력 날짜 정의
  const startDateOfMonth = startOfMonth(displayDate); //1~31
  const endDateOfMonth = endOfMonth(displayDate); //1~31
  const startDateOfWeek = startOfWeek(startDateOfMonth, { weekStartsOn: 1 });//일요일 시작 기준이라 월요일 시작 기준으로 처리 필요
  const endDateOfWeek = endOfWeek(endDateOfMonth, { weekStartsOn: 1 });


  let day = startDateOfWeek;
  const calendarDate: Array<Array<Date>> = [[]];
  // console.log(startDateOfWeek, endDateOfWeek);
  // console.log(calendarDate);

  //make calendar date value array
  while (day <= endDateOfWeek) {
    const weeksIndex = calendarDate.length - 1;
    calendarDate[weeksIndex].push(day);
    if (calendarDate[weeksIndex].length === 7) {
      calendarDate.push([]);
    }
    day = addDays(day, 1);
  }
  calendarDate.pop();

  return { calendarDate };
}

export default makeCalendarDate;