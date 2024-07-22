'use client';

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { lazy, Suspense, useEffect } from "react";

//function
import IsMobile from "@/function/IsMobile";
import { getDiary_date } from "@/app/(afterLogin)/_lib/diary";

//styledComponent
import SC_Common from "@/style/common";

//component
import ContentArea from "@/component/common/ContentArea";
import Diary from "@/component/diary/Diary";
const LazyCalendarSelector = lazy(() => import('@/component/calendar/CalendarSelector'));

//icon
import Header from "@/component/common/Header";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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
        {isMobile &&
          <Suspense fallback={<CalendarLoading>
            <CalendarMonthIcon fontSize="inherit" />
            <span>Loading</span>
          </CalendarLoading>}>
            <CalendarWrapper>
              <LazyCalendarSelector />
            </CalendarWrapper>
          </Suspense>
        }
        <Diary diaryData={diaryData} position="calendar" />
      </ContentArea>
    </SC_Common.Wrapper>
  );
}

export default CalendarPageClient;
const CalendarLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 128px;

  color: ${(props) => props.theme.point ? props.theme.point + '70' : '#979FC7'};
  span{
    font-size: 22px;
    font-weight: 600;
  }
`
const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin-top: 16px;

  @media (max-width: 479px) { //mobile port
    padding: 0 5dvw;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    max-width: 600px;
    min-height : 500px;
  }
  @media (min-width:1024px) { //desktop
  }
`