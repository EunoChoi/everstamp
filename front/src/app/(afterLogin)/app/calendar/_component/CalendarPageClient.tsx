'use client';

import { useRouter } from "next/navigation";
import styled from "styled-components";

//function
import IsMobile from "@/function/IsMobile";
import { getDiary_date } from "@/app/(afterLogin)/_lib/diary";

//styledComponent
import SC_Common from "@/style/common";

//component
import Diary from "@/component/diary/Diary";
import CalendarSelector from "@/component/calendar/CalendarSelector";

//icon
import Header from "@/component/common/Header";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect } from "react";
import ContentArea from "@/component/common/ContentArea";

interface Props {
  date: number;
}

const CalendarPageClient = ({ date }: Props) => {
  const isMobile = IsMobile();
  const router = useRouter();

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
      <ContentArea>
        <Header title='calendar' />
        {isMobile && <CalendarWrapper><CalendarSelector /></CalendarWrapper>}
        <Diary diaryData={diaryData} position="calendar" />
      </ContentArea>
    </SC_Common.Wrapper>
  );
}

export default CalendarPageClient;

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin-top: 8px;

  @media (max-width: 479px) { //mobile port
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    min-height : 400px;
  }
  @media (min-width:1024px) { //desktop
  }
`