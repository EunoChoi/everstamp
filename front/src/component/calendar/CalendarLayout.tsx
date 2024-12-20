'use client';

import styled from "styled-components";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { addMonths, subMonths } from 'date-fns';

//function
import makeCalendarDates from "./function/makeCalendarDates";
import React from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

interface Props {
  displayDate: Date;
  setDisplayDate: Dispatch<SetStateAction<Date>>;
  FormattedValue: ({ displayDate, dateData }: { displayDate: Date, dateData: Date }) => JSX.Element;
  todayRouterPushAction?: () => void;
  isTouchGestureEnabled?: boolean;
  isDateSelectionEnabled?: boolean;
}

const CalendarLayout = ({ displayDate, setDisplayDate, FormattedValue, todayRouterPushAction, isTouchGestureEnabled, isDateSelectionEnabled }: Props) => {
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

export default CalendarLayout;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`