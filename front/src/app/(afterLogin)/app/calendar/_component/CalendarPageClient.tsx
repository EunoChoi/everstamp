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
import CalendarSelector from "@/component/CalendarSelector";

//icon
import Header from "@/component/Header";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect } from "react";

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
      <SC_Common.Content className="noOption">
        <Header title='calendar' />
        {isMobile && <CalendarWrapper><CalendarSelector /></CalendarWrapper>}
        <Diary diaryData={diaryData} position="calendar" />
      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default CalendarPageClient;

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 0 4px;
  margin-top: 12px;

  @media (max-width: 479px) { //mobile port
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    height: 100vh !important;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
  }
`