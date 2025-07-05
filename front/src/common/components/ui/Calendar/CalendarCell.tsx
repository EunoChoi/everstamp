import { endOfMonth, isAfter, isBefore, isSameDay, isSameMonth, startOfMonth } from "date-fns";
import { useRouter } from "next/navigation";
import { memo } from "react";
import styled from "styled-components";
import { useCalendar } from "./CalendarContext";
import { useGetSelectedDate } from "./hooks/useGetSelectedDate";


// props로 받은 dateFormating 함수를 이용해 어떤 결과를 보여줄지를 결정한다. 
// memo를 사용해서 자신의 prop(date)이 바뀌지 않으면 리렌더링되지 않도록 최적화
export const CalendarCell = memo(({ cellDate }: { cellDate: Date }) => {
  const router = useRouter();

  const { displayDate, prevMonth, nextMonth, renderDateContent, onClickDate } = useCalendar();
  const { selectedDate } = useGetSelectedDate();
  const today = new Date();

  const isToday = isSameDay(cellDate, today);
  const isCurrentMonth = isSameMonth(cellDate, displayDate);
  const isSelectedDate = isSameDay(cellDate, selectedDate);
  const isPrevMonth = isBefore(cellDate, startOfMonth(displayDate));
  const isNextMonth = isAfter(cellDate, endOfMonth(displayDate));

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
      {renderDateContent({ cellDate: cellDate })}
    </CellWrapper >
  );
});

const CellWrapper = styled.div`
  transition: background-color 300ms ease-in-out;

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
    background-color: ${(props) => props.theme.point ? props.theme.point + 30 : '#979FC7'}; 
  }
  &.selected{
    border-color: ${(props) => props.theme.point ? props.theme.point + 90 : '#979FC7'};
  }
  &.notCurrentMonth{
    opacity: 0.3;
  }
`