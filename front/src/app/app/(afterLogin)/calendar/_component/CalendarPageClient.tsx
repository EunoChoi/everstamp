'use client';

import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";

//function
import IsMobile from "@/common/function/IsMobile";
import { getDiary_date } from "@/common/function/fetch/diary";

//styledComponent
import $Common from "@/common/style/common";

//component
import ContentArea from "@/common/components/ContentArea";
import Diary from "@/common/components/Diary";
import Header from "@/common/components/Header";
import { useCustomRouter } from "@/common/function/customRouter";
import CalendarLayout from "@/common/components/Calendar";
import CalendarPageValue from "@/app/app/(afterLogin)/calendar/_component/CalendarPageValue";
import { getCleanTodayTime } from "@/common/function/getCleanTodayTime";

interface Props {
  date: number;
}

const CalendarPageClient = ({ date }: Props) => {
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
    router.prefetch('/app/list');
    router.prefetch('/app/habit');
    router.prefetch('/app/setting');
  }, [])

  return (
    <$Common.Wrapper>
      <Header title='calendar' />
      <ContentArea>
        <CalendarContainer>
          {isMobile === true &&
            <>
              <CalendarWrapper>
                <CalendarLayout
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

export default CalendarPageClient;
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