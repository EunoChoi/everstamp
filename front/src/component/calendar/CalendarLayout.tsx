'use client';

import styled from "styled-components";
import { useCallback, useState } from "react";
import { addMonths, subMonths } from 'date-fns';

//function
import makeCalendarDates from "./function/makeCalendarDates";
import React from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

interface Props {
  Value: ({ dateData }: { dateData: Date }) => JSX.Element;
  todayRouterPushAction?: () => void;
  isTouchGestureEnabled?: boolean;
  isDateSelectionEnabled?: boolean;
}

const CalendarLayout = ({ Value, todayRouterPushAction, isTouchGestureEnabled, isDateSelectionEnabled }: Props) => {
  const [displayDate, setDisplayDate] = useState(new Date());
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
        Value={Value}
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

export default CalendarLayout;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`