'use client';

import styled from "styled-components";



//hooks
import IsMobile from "@/hooks/IsMobile";

//styledComponent
import SC_Common from "@/styleComponent/common";

//component
import Header from "@/component/header";
import Diary from "@/component/diary";
import CalendarSelector from "@/component/calendarSelector";

//icon
import TodayIcon from '@mui/icons-material/Today';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const Calendar = () => {

  const isMobile = IsMobile();
  const router = useRouter();
  const params = useSearchParams();
  const date = Number(params.get('date'));

  const getCleanTodayTime = useCallback(() => {
    const tempDate = new Date();
    return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime();
  }, []);

  //url '/calendar' 강제 접근 시 쿼리스트링 처리
  useEffect(() => {
    if (date === 0) router.push(`/io/calendar?date=${getCleanTodayTime()}`);
  }, [date])



  return (
    <SC_Common.Wrapper>
      <SC_Common.Content className="noOption">
        {isMobile &&
          <CalendarWrapper>
            <CalendarSelector />
          </CalendarWrapper>}

        <Diary isCalendar={true} dateInfo={date !== 0 ? date : getCleanTodayTime()} />
      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default Calendar;

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* border: solid rgba(0,0,0,0.05) 4px; */
  border-radius: 8px;
  padding: 12px 4px;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    margin-bottom: 12px;
  }
`