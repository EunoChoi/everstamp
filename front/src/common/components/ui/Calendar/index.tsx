'use client';

import styled from "styled-components";

//function
import { Dispatch, SetStateAction } from "react";
import CalendarBody from "./CalendarBody";
import { CalendarProvider } from './CalendarContext';
import CalendarHeader from "./CalendarHeader";
import { CellDateValue } from "./utils/makeCalendarDates";

interface CalendarProps<T> {
  className?: string;
  headerSize?: 'small' | 'middle' | 'large';
  headerTitlePosition?: 'center' | 'start';

  selectedDate: string;
  displayDate: Date;
  setDisplayDate: Dispatch<SetStateAction<Date>>;
  monthlyData?: T;
  onClickMonthTitle?: () => void;
  onClickDate?: (date: CellDateValue) => void;
  RenderDateContent?: ({ cellDate }: {
    cellDate: CellDateValue;
  }) => JSX.Element

  isTouchGestureEnabled?: boolean;
  isDateSelectionEnabled?: boolean;
}

const Calendar = <T,>({
  className,
  headerSize = 'large',
  headerTitlePosition = 'start',

  monthlyData,
  displayDate,
  selectedDate,

  setDisplayDate,

  onClickMonthTitle,
  onClickDate,

  RenderDateContent,
  isTouchGestureEnabled,
  isDateSelectionEnabled
}: CalendarProps<T>) => {

  return (
    <CalendarProvider
      monthlyData={monthlyData}
      displayDate={displayDate}
      setDisplayDate={setDisplayDate}

      onClickMonthTitle={onClickMonthTitle}
      onClickDate={onClickDate}
      selectedDate={selectedDate}

      RenderDateContent={RenderDateContent}
      isTouchGestureEnabled={isTouchGestureEnabled}
      isDateSelectionEnabled={isDateSelectionEnabled}
    >
      <Wrapper className={className}>
        <CalendarHeader
          headerSize={headerSize}
          headerTitlePosition={headerTitlePosition}
        />
        <CalendarBody />
      </Wrapper>
    </CalendarProvider>
  );
}

export default Calendar;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    `