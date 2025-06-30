'use client';

import { addMonths, subMonths } from 'date-fns';
import { Dispatch, SetStateAction, useCallback } from "react";
import styled from "styled-components";

//function
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";
import makeCalendarDates from "./utils/makeCalendarDates";

interface Props {
  className?: string;
  headerSize?: 'small' | 'middle' | 'large';
  headerTitlePosition?: 'center' | 'start';
  displayDate: Date;
  setDisplayDate: Dispatch<SetStateAction<Date>>;
  FormattedValue: ({ displayDate, dateData }: { displayDate: Date, dateData: Date }) => JSX.Element;
  todayRouterPushAction?: () => void;
  isTouchGestureEnabled?: boolean;
  isDateSelectionEnabled?: boolean;
}

const Calendar = ({ className, headerSize = 'large', headerTitlePosition = 'start', displayDate, setDisplayDate, FormattedValue, todayRouterPushAction, isTouchGestureEnabled, isDateSelectionEnabled }: Props) => {
  const { calendarDates } = makeCalendarDates(displayDate);

  const nextDisplayMonth = useCallback(() => {
    setDisplayDate(addMonths(displayDate, 1));
  }, [displayDate]);
  const beforeDisplayMonth = useCallback(() => {
    setDisplayDate(subMonths(displayDate, 1));
  }, [displayDate]);

  return (
    <Wrapper className={className}>
      <CalendarHeader
        headerSize={headerSize}
        headerTitlePosition={headerTitlePosition}
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
`