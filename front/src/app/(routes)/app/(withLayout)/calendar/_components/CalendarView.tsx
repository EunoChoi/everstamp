'use client';

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

//function
import { getDiaryByDate } from "@/common/fetchers/diary";
import IsMobile from "@/common/functions/IsMobile";

//styledComponent
import $Common from "@/common/styles/common";

//component
import CommonBody from "@/common/components/layout/CommonBody";
import Header from "@/common/components/layout/Header";
import Calendar from "@/common/components/ui/Calendar";
import CalendarPageValue from "@/common/components/ui/Calendar/CalendarPageValue";
import Diary from "@/common/components/ui/Diary";
import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import useCustomRouter from "@/common/hooks/useCustomRouter";


interface Props {
  date: number;
}

const CalendarView = ({ date }: Props) => {
  const isMobile = IsMobile();
  const router = useCustomRouter();
  const path = usePathname();

  const [displayDate, setDisplayDate] = useState(new Date());
  //get diary data by date
  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'calendar', format(date, 'yyMMdd')],
    queryFn: () => getDiaryByDate({ date }),
  });

  const todayRouterPushAction = () => {
    router.push(`/app/calendar?date=${getCleanTodayTime()}`);
  }

  //production mode에서만 동작, 정적 자료만 prefetch
  useEffect(() => {
    router.prefetch('/app/list');
    router.prefetch('/app/habit');
    router.prefetch('/app/setting');
  }, [])

  return (
    <$Common.Wrapper>
      <Header title='calendar' />
      <CalendarBody>
        {isMobile === true &&
          <CalendarWrapper>
            <Calendar
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              FormattedValue={CalendarPageValue}
              todayRouterPushAction={todayRouterPushAction}
              isTouchGestureEnabled={true}
              isDateSelectionEnabled={true}
            />
            <Diary type="small" diaryData={diaryData ? diaryData : { date: date }} />
          </CalendarWrapper>}
        {isMobile === false &&
          <CalendarWrapper>
            <Diary type="large" diaryData={diaryData ? diaryData : { date: date }} />
          </CalendarWrapper>
        }
      </CalendarBody>
    </$Common.Wrapper>
  );
}

export default CalendarView;

const CalendarBody = styled(CommonBody)`
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
   padding: 24px 0;
  }
  
`
const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  @media (max-width: 479px) { //mobile port
    gap: 12px;
    padding: 12px 4dvw;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    justify-content: start;
    gap: 24px;
    height: 150dvh;
  }
  @media (min-width:1024px) { //desktop
  }
`