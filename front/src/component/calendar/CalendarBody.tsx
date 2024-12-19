'use client';

import { format, isSameDay, isSameMonth } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  Value: ({ dateData }: { dateData: Date }) => JSX.Element;
  calendarDates: Date[][];
  displayDate: Date;
  beforeDisplayMonth: () => void;
  nextDisplayMonth: () => void;
  isTouchGestureEnabled?: boolean;
  isDateSelectionEnabled?: boolean;
}

const CalendarBody = ({
  Value,
  calendarDates,
  displayDate,
  beforeDisplayMonth,
  nextDisplayMonth,
  isTouchGestureEnabled,
  isDateSelectionEnabled }: Props) => {

  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();

  const today = new Date();
  const date = Number(params.get('date'));

  const [selectedDate, setSelectedDate] = useState(new Date(Number(params.get('date'))));
  const displayMonth = format(displayDate, 'yyyyM');
  const [touchStartX, setTouchStartX] = useState<number>(0);   //for touch gesture


  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(date));
    }
  }, [date])

  return (
    <CalBody
      onTouchStart={(e: any) => {
        isTouchGestureEnabled && setTouchStartX(e.changedTouches[0].clientX);
      }}
      onTouchEnd={(e: any) => {
        if (isTouchGestureEnabled) {
          const touchEndX = e.changedTouches[0].clientX;
          if (touchEndX - touchStartX > 100) beforeDisplayMonth && beforeDisplayMonth();
          else if (touchStartX - touchEndX > 100) nextDisplayMonth && nextDisplayMonth();
        }
      }}
    >
      {calendarDates.map((weekRow, i) =>
        <CalRow key={'weeks' + i} className="cal_week_row">
          {weekRow?.map(dateValue => {
            const key = format(dateValue, 'yyMMdd');
            return (<CellWrapper
              key={key}
              onClick={() => {
                // console.log(cellMonth, displayMonth);
                if (isDateSelectionEnabled) {
                  const cellMonth = format(dateValue, 'yyyyM');
                  if (cellMonth < displayMonth) beforeDisplayMonth();
                  else if (cellMonth > displayMonth) nextDisplayMonth();
                  else router.push(`${path}?date=${dateValue.getTime()}`);
                }
              }}
              className={`
              ${isSameDay(dateValue, today) ? 'today' : ''}
              ${isSameMonth(dateValue, displayDate) ? 'currentMonth' : 'notCurrentMonth'}
              ${isSameDay(dateValue, selectedDate) ? 'selected' : ''}
            `}
            >
              <Value dateData={dateValue} />
            </CellWrapper>);
          })}
        </CalRow>)
      }
    </CalBody >
  );
}

export default CalendarBody;

const CellWrapper = styled.div`
  transition: border 300ms ease-in-out;

  width: 14%;
  height: 85%;

  color: #666565;
  
  border-top: 4px solid rgba(0,0,0,0);
  border-bottom: 4px solid rgba(0,0,0,0);

  &.today{
    border-bottom-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  &.selected{     
    border-bottom-color: ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};
  }
  &.notCurrentMonth{
    opacity: 0.3;
  }
`
const CalBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const CalRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`