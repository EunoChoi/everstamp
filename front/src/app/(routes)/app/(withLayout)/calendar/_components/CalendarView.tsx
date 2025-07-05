'use client';

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import styled from "styled-components";

//function
import { getDiaryByDate } from "@/common/fetchers/diary";

//styledComponent

//component
import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import Calendar from "@/common/components/ui/Calendar";
import Diary from "@/common/components/ui/Diary";
import { getAllHabitsMonthInfo } from "@/common/fetchers/habit";
import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { RenderDateContent } from "../_utils/CalendarInfoDateContent";


interface CalendarViewProps {
  date: number;
}
interface MonthHabitsType {
  [key: string]: { habitsCount: number, isVisible: boolean, emotionType: number };
}

const CalendarView = ({ date }: CalendarViewProps) => {
  usePrefetchPage();
  const router = useCustomRouter();

  const [displayDate, setDisplayDate] = useState(new Date());

  //get date diary data
  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'calendar', format(date, 'yyMMdd')],
    queryFn: () => getDiaryByDate({ date }),
  });

  const { data: monthHabits } = useQuery({
    queryKey: ['habit', 'month', format(displayDate, 'MM')],
    queryFn: () => getAllHabitsMonthInfo({ date: displayDate }),
    select: (data) => { //select 옵션 덕분에 가공한 데이터도 캐시에 저장된다., 데이터를 가져올때마다 매번 가공 x
      const monthHabits: MonthHabitsType = {};
      data.forEach((e: any) => {
        monthHabits[format(e.date, 'yyMMdd')] = { habitsCount: e?.Habits?.length, isVisible: e?.visible, emotionType: e?.emotion };
      });
      return monthHabits;
    }
  });

  const onClickMonthTitle = () => {
    router.push(`/app/calendar?date=${getCleanTodayTime()}`);
  }
  const onClickDate = useCallback((date: Date) => {
    router.push(`calendar?date=${date.getTime()}`);
  }, []);

  return (
    <PageWrapper>
      <CalendarContentWrapper>
        <CalendarPageCalendar
          isTouchGestureEnabled={true}
          isDateSelectionEnabled={true}
          headerTitlePosition="start"
          headerSize="large"

          displayDate={displayDate}
          setDisplayDate={setDisplayDate}
          monthlyData={monthHabits}
          RenderDateContent={RenderDateContent}

          onClickMonthTitle={onClickMonthTitle}
          onClickDate={onClickDate}
        />
        <Diary type="small" diaryData={diaryData ? diaryData : { date: date }} />
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