'use client';

import styled from "styled-components";
import { Children, ReactElement, ReactNode, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { format, addMonths, subMonths } from 'date-fns';

//icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TodayIcon from '@mui/icons-material/Today';

//function
import makeCalendarDate from "./function/makeCalendarDate";
import React from "react";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";

interface Props {
  CalendarBody: ({ calendarDate, displayDate }: any) => JSX.Element;
}

const CalendarLayout = ({ CalendarBody }: Props) => {
  const WEEK_TITLE_ENG = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const path = usePathname();
  const router = useRouter();

  const [displayDate, setDisplayDate] = useState(new Date());
  const { calendarDate } = makeCalendarDate(displayDate);

  const nextDisplayMonth = useCallback(() => {
    setDisplayDate(addMonths(displayDate, 1));
  }, [displayDate]);
  const beforeDisplayMonth = useCallback(() => {
    setDisplayDate(subMonths(displayDate, 1));
  }, [displayDate]);

  return (
    <Wrapper>
      <CalHeader>
        <CalHeaderButtons className="start">
          <button
            onClick={() => {
              router.push(`/app/calendar?date=${getCleanTodayTime()}`);
              router.push(`${path}?date=${getCleanTodayTime()}`);
              setDisplayDate(new Date());
            }}>
            <TodayIcon fontSize="small" />
          </button>
        </CalHeaderButtons>
        <CalTitleText>
          <span className="month">{format(displayDate, 'yyyy.MM')}</span>
        </CalTitleText>
        <CalHeaderButtons className="end">
          <button onClick={beforeDisplayMonth}><KeyboardArrowLeftIcon fontSize="small" /></button>
          <button onClick={nextDisplayMonth}><KeyboardArrowRightIcon fontSize="small" /></button>
        </CalHeaderButtons>
      </CalHeader>
      <CalWeekTitle>
        {WEEK_TITLE_ENG.map(e => <span key={e}>{e}</span>)}
      </CalWeekTitle>
      <CalendarBody
        calendarDate={calendarDate}
        displayDate={displayDate}
        nextDisplayMonth={nextDisplayMonth}
        beforeDisplayMonth={beforeDisplayMonth}
      />
    </Wrapper>
  );
}

export default CalendarLayout;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`
const CalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 2px 0px;
  >*{
    width: 30%;
  }
`
const CalTitleText = styled.div`  
  text-align: center;
  text-transform: capitalize;

  font-size: 20px;
  color: rgb(var(--greyTitle));

  .month{
    font-weight: 600;
  }
  .year{
    font-weight: 500;
    margin-left: 8px;
  }
`
const CalHeaderButtons = styled.div`
  color: rgb(var(--greyTitle));
  display: flex;
  &.start{
    justify-content: start;
  }
  &.end{
    justify-content: end;
  }
  button{
    padding: 0 8px;
  }
`

const CalWeekTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-transform: capitalize;
  padding: 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--greyTitle));

  span{
    width: 100%;
    text-align: center;
  }
`
