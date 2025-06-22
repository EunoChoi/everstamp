'use client';

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import styled from "styled-components";

//function
import { getDiaryByDate } from "@/common/fetchers/diary";

//styledComponent

//component
import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import Calendar from "@/common/components/ui/Calendar";
import CalendarPageValue from "@/common/components/ui/Calendar/CalendarPageValue";
import Diary from "@/common/components/ui/Diary";
import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";


interface Props {
  date: number;
}

const CalendarView = ({ date }: Props) => {
  usePrefetchPage();
  const router = useCustomRouter();

  const [displayDate, setDisplayDate] = useState(new Date());

  //get diary data by date
  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'calendar', format(date, 'yyMMdd')],
    queryFn: () => getDiaryByDate({ date }),
  });

  const todayRouterPushAction = () => {
    router.push(`/app/calendar?date=${getCleanTodayTime()}`);
  }
  1
  return (
    <PageWrapper>
      <CalendarContentWrapper>
        <Calendar
          displayDate={displayDate}
          setDisplayDate={setDisplayDate}
          FormattedValue={CalendarPageValue}
          todayRouterPushAction={todayRouterPushAction}
          isTouchGestureEnabled={true}
          isDateSelectionEnabled={true}
        />
        <Diary type="small" diaryData={diaryData ? diaryData : { date: date }} />
      </CalendarContentWrapper>
    </PageWrapper>
  );
}

export default CalendarView;

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