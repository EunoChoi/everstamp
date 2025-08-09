'use client';

import { format } from "date-fns";
import { useCallback, useState } from "react";
import styled from "styled-components";

import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import Calendar from "@/common/components/ui/Calendar";
import { CellDateValue } from "@/common/components/ui/Calendar/utils/makeCalendarDates";
import Diary from "@/common/components/ui/Diary";
import EmptyDiary from "@/common/components/ui/EmtpyDiary";
import { DiaryWithRelations } from "@/server/types";
import { useRouter } from "next/navigation";
import { RenderDateContent } from "./_utils/CalendarInfoDateContent";


interface CalendarViewProps {
  selectedDate: string;
  diaryData?: DiaryWithRelations | null;
}
interface MonthHabitsType {
  [key: string]: { habitsCount: number, isVisible: boolean, emotionType: number };
}

const CalendarView = ({ selectedDate, diaryData = null }: CalendarViewProps) => {
  const router = useRouter();
  const [displayDate, setDisplayDate] = useState(new Date());

  const onClickMonthTitle = () => {
    const todayString = format(new Date(), 'yyyy-MM-dd');
    router.push(`calendar?date=${todayString}`);
  }
  const onClickDate = useCallback((clickedDate: CellDateValue) => {
    router.push(`calendar?date=${clickedDate.dateString}`);
  }, []);

  return (
    <PageWrapper>
      <CalendarContentWrapper>
        <CalendarPageCalendar
          isTouchGestureEnabled={true}
          isDateSelectionEnabled={true}
          headerTitlePosition="start"
          headerSize="large"

          selectedDate={selectedDate}
          displayDate={displayDate}
          setDisplayDate={setDisplayDate}
          // monthlyData={monthHabits}
          RenderDateContent={RenderDateContent}

          onClickMonthTitle={onClickMonthTitle}
          onClickDate={onClickDate}
        />
        {diaryData ? <Diary diaryData={diaryData} /> : <EmptyDiary selectedDate={selectedDate} />}
      </CalendarContentWrapper>
    </PageWrapper>
  );
}

export default CalendarView;

const CalendarPageCalendar = styled(Calendar)`
  @media (max-width: 479px) { //mobile port
    flex-grow: 1;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    min-height: 500px;
    flex-grow: 1;
    flex-shrink: 0;
  }
  @media (min-width:1025px) { //desktop
    flex-grow: 1;
  }
`
const CalendarContentWrapper = styled(ContentWrapper)`
  max-width: 600px;
  height: 100%;

  @media (max-width: 479px) { //mobile port
    gap: 12px;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    padding-top: 24px;
    gap: 24px;
  }
  @media (min-width:1024px) { //desktop
    padding-top: 24px;
    gap: 24px;
  }
`