'use client';

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect } from "react";

//function
import IsMobile from "@/function/IsMobile";
import { getDiary_date } from "@/app/(afterLogin)/_lib/diary";

//styledComponent
import SC_Common from "@/style/common";

//component
import ContentArea from "@/component/common/ContentArea";
import Diary from "@/component/diary/Diary";
import CalendarSelector from "@/component/calendar/CalendarSelector";
import Header from "@/component/common/Header";
import { useCustomRouter } from "@/function/customRouter";

interface Props {
  date: number;
}

const CalendarPageClient = ({ date }: Props) => {
  const isMobile = IsMobile();
  const router = useCustomRouter();

  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'calendar', format(date, 'yyMMdd')],
    queryFn: () => getDiary_date({ date }),
  });

  //production mode에서만 동작, 정적 자료만 prefetch
  useEffect(() => {
    router.prefetch('/app/list');
    router.prefetch('/app/habit');
    router.prefetch('/app/setting');
  }, [])

  return (
    <SC_Common.Wrapper>
      <Header title='calendar' />
      <ContentArea>
        <CalendarContainer>
          {isMobile === true &&
            <>
              <CalendarWrapper>
                <CalendarSelector />
              </CalendarWrapper>
              <Diary diaryData={diaryData} position="calendar" />
            </>}
          {isMobile === false &&
            <Diary diaryData={diaryData} position="calendar" />
          }
        </CalendarContainer>
      </ContentArea>
    </SC_Common.Wrapper>
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