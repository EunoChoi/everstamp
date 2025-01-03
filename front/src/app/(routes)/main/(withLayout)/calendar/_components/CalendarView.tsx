'use client';

import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";

//function
import IsMobile from "@/common/functions/IsMobile";
import { getDiary_date } from "@/common/fetchers/diary";

//styledComponent
import $Common from "@/common/styles/common";

//component
import ContentArea from "@/common/components/layout/ContentArea";
import Diary from "@/common/components/ui/Diary";
import Header from "@/common/components/layout/Header";
import Calendar from "@/common/components/ui/Calendar";
import CalendarPageValue from "@/common/components/ui/Calendar/CalendarPageValue";
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
    queryFn: () => getDiary_date({ date }),
  });

  const todayRouterPushAction = () => {
    router.push(`${path}?date=${getCleanTodayTime()}`);
  }

  //production mode에서만 동작, 정적 자료만 prefetch
  useEffect(() => {
    router.prefetch('/main/list');
    router.prefetch('/main/habit');
    router.prefetch('/main/setting');
  }, [])

  return (
    <$Common.Wrapper>
      <Header title='calendar' />
      <ContentArea>
        <CalendarContainer>
          {isMobile === true &&
            <>
              <CalendarWrapper>
                <Calendar
                  displayDate={displayDate}
                  setDisplayDate={setDisplayDate}
                  FormattedValue={CalendarPageValue}
                  todayRouterPushAction={todayRouterPushAction}
                  isTouchGestureEnabled={true}
                  isDateSelectionEnabled={true}
                />
              </CalendarWrapper>
              <Diary diaryData={diaryData} position="calendar" />
            </>}
          {isMobile === false &&
            <Diary diaryData={diaryData} position="calendar" />
          }
        </CalendarContainer>
      </ContentArea>
    </$Common.Wrapper>
  );
}

export default CalendarView;
const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 479px) { //mobile port
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
     justify-content: start;
  }
  @media (min-width:1024px) { //desktop
  }
`
const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin-top: 24px;
  margin-top: 12px;
  margin-bottom: 12px;

  @media (max-width: 479px) { //mobile port
    padding: 0 5dvw;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    max-width: 600px;
    min-height : 360px;
  }
`