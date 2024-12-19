'use client';

import { getHabit_status_month } from "@/function/fetch/habit";
import { useQuery } from "@tanstack/react-query";
import { addMonths, format, getMonth, isSameDay, isSameMonth, subMonths } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import ValueAtCalendarPage from "./ValueAtCalendarPage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  calendarDate: Date[][];
  displayDate: Date;
  beforeDisplayMonth: () => void;
  nextDisplayMonth: () => void;
}
interface monthHabitsType {
  [key: string]: { habitsCount: number, isVisible: boolean, emotionType: number };
}

const BodyAtCalendarPage = ({ calendarDate, displayDate, beforeDisplayMonth, nextDisplayMonth }: Props) => {

  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();

  const today = new Date();
  const date = Number(params.get('date'));

  const [selectedDate, setSelectedDate] = useState(new Date(Number(params.get('date'))));
  const displayMonth = format(displayDate, 'M');
  const [touchStartX, setTouchStartX] = useState<number>(0);   //for touch gesture

  const { data: monthHabitsByAll } = useQuery({
    queryKey: ['habit', 'month', format(displayDate, 'MM')],
    queryFn: () => getHabit_status_month({ date: displayDate }),
  });


  const monthHabitResult: monthHabitsType = {};
  monthHabitsByAll?.forEach((e: any) => {
    monthHabitResult[format(e.date, 'yyMMdd')] = { habitsCount: e?.Habits?.length, isVisible: e?.visible, emotionType: e?.emotion };
  });

  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(date));
    }
  }, [date])

  return (<CalBody
    onTouchStart={(e: any) => {
      setTouchStartX(e.changedTouches[0].clientX);
    }}
    onTouchEnd={(e: any) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchEndX - touchStartX > 100) beforeDisplayMonth && beforeDisplayMonth();
      else if (touchStartX - touchEndX > 100) nextDisplayMonth && nextDisplayMonth();
    }}
  >
    {calendarDate.map((weekRow, i) =>
      <CalRow key={'weeks' + i} className="cal_week_row">
        {weekRow?.map(dateData => {
          const key = format(dateData, 'yyMMdd');
          return (<CellWrapper
            key={key}
            onClick={() => {
              const cellMonth = format(dateData, 'M');
              if (cellMonth < displayMonth) beforeDisplayMonth();
              else if (cellMonth > displayMonth) nextDisplayMonth();
              else router.push(`${path}?date=${dateData.getTime()}`);
            }}
            className={`
              ${isSameDay(dateData, today) ? 'today' : ''}
              ${isSameMonth(dateData, displayDate) ? 'currentMonth' : 'notCurrentMonth'}
              ${isSameDay(dateData, selectedDate) ? 'selected' : ''}
            `}
          >
            <ValueAtCalendarPage dateData={dateData} monthHabitResult={monthHabitResult} />
          </CellWrapper>);
        })}
      </CalRow>)}
  </CalBody >);
}

export default BodyAtCalendarPage;

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
    opacity: 0.4;
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