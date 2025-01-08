'use client';

import { addMonths, subMonths } from 'date-fns';
import { Dispatch, SetStateAction, useCallback } from "react";
import styled from "styled-components";

//function
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import makeCalendarDates from "./utils/makeCalendarDates";

interface Props {
  displayDate: Date;
  setDisplayDate: Dispatch<SetStateAction<Date>>;
  FormattedValue: ({ displayDate, dateData }: { displayDate: Date, dateData: Date }) => JSX.Element;
  todayRouterPushAction?: () => void;
  isTouchGestureEnabled?: boolean;
  isDateSelectionEnabled?: boolean;
}

const Calendar = ({ displayDate, setDisplayDate, FormattedValue, todayRouterPushAction, isTouchGestureEnabled, isDateSelectionEnabled }: Props) => {
  const { calendarDates } = makeCalendarDates(displayDate);

  const nextDisplayMonth = useCallback(() => {
    setDisplayDate(addMonths(displayDate, 1));
  }, [displayDate]);
  const beforeDisplayMonth = useCallback(() => {
    setDisplayDate(subMonths(displayDate, 1));
  }, [displayDate]);

  return (
    <Wrapper>
      <CalendarHeader
        todayRouterPushAction={todayRouterPushAction}
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        beforeDisplayMonth={beforeDisplayMonth}
        nextDisplayMonth={nextDisplayMonth}
      />
      <CalendarBody
        FormattedValue={FormattedValue}
        calendarDates={calendarDates}
        displayDate={displayDate}
        nextDisplayMonth={nextDisplayMonth}
        beforeDisplayMonth={beforeDisplayMonth}
        isTouchGestureEnabled={isTouchGestureEnabled}
        isDateSelectionEnabled={isDateSelectionEnabled}
      />
    </Wrapper>
  );
}

export default Calendar;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    min-height: 350px;
  }
`