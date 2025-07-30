import { endOfMonth, format, isAfter, isBefore, isSameDay, isSameMonth, startOfMonth } from "date-fns";
import { memo } from "react";
import styled from "styled-components";
import { useCalendar } from "./CalendarContext";
import { CellDateValue } from "./utils/makeCalendarDates";


// props로 받은 dateFormating 함수를 이용해 어떤 결과를 보여줄지를 결정
// memo를 사용해서 자신의 prop(date)이 바뀌지 않으면 리렌더링되지 않도록 최적화
export const CalendarCell = memo(({ cellDate }: { cellDate: CellDateValue }) => {
  const today = new Date();

  const { displayDate, prevMonth, nextMonth, RenderDateContent, onClickDate, selectedDate } = useCalendar();
  const cellDateObject = cellDate.dateObject;
  const cellDateString = cellDate.dateString;

  const isToday = isSameDay(cellDateObject, today);
  const isCurrentMonth = isSameMonth(cellDateObject, displayDate);
  const isSelectedDate = isSameDay(cellDateObject, new Date(selectedDate));
  const isPrevMonth = isBefore(cellDateObject, startOfMonth(displayDate));
  const isNextMonth = isAfter(cellDateObject, endOfMonth(displayDate));

  const handleClick = () => {
    if (onClickDate) {
      onClickDate(cellDate);
    }
    if (isPrevMonth) {
      prevMonth();
    }
    else if (isNextMonth) {
      nextMonth();
    }
  };

  return (
    <CellWrapper
      onClick={handleClick}
      className={`
        ${(isCurrentMonth && isToday) ? 'today' : ''}
        ${isCurrentMonth ? 'currentMonth' : 'notCurrentMonth'}
        ${(isCurrentMonth && isSelectedDate) ? 'selected' : ''}
      `}
    >
      {RenderDateContent ?
        <RenderDateContent cellDate={cellDate} />
        : format(cellDateObject, 'd')
      }
    </CellWrapper >
  );
});

CalendarCell.displayName = 'CalendarCell';

const CellWrapper = styled.div`
  transition: border-color 400ms ease-in-out;

  width: 14%;
  height: 98%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #666565;
  

  border : solid transparent 3px;
  border-radius: 8px;
  &.currentMonth{}
  &.today{
    background-color: ${(props) => props.theme.themeColor ? props.theme.themeColor + 30 : '#979FC7'}; 
  }
  &.selected{
    border-color: ${(props) => props.theme.themeColor ? props.theme.themeColor + 90 : '#979FC7'};
  }
  &.notCurrentMonth{
    opacity: 0.3;
  }
  font-size: 16px;
  span{
    font-size: 16px;
  }
`