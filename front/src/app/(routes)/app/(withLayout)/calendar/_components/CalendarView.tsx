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
          <Content>
            <Calendar
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              FormattedValue={CalendarPageValue}
              todayRouterPushAction={todayRouterPushAction}
              isTouchGestureEnabled={true}
              isDateSelectionEnabled={true}
            />
            <Diary type="small" diaryData={diaryData ? diaryData : { date: date }} />
          </Content>
        }
        {isMobile === false &&
          <Content>
            <Diary type="large" diaryData={diaryData ? diaryData : { date: date }} />
          </Content>
        }
      </CalendarBody>
    </$Common.Wrapper>
  );
}

export default CalendarView;

const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 479px) { //mobile port
    gap: 12px;
    padding: 12px 4dvw;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    justify-content: start;
    padding: 24px 0;
    gap: 24px;
  }
`
const CalendarBody = styled(CommonBody)`
  max-width: 600px;
`