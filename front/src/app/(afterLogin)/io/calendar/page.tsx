'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

//hooks
import IsMobile from "@/hooks/IsMobile";

//styledComponent
import SC_Common from "@/style/common";

//component
import Diary from "@/component/Diary";
import CalendarSelector from "@/component/CalendarSelector";

//icon
import Header from "@/component/Header";

const Calendar = () => {

  const isMobile = IsMobile();
  const router = useRouter();
  const params = useSearchParams();
  const date = Number(params.get('date'));

  const getCleanTodayTime = useCallback(() => {
    const tempDate = new Date();
    return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime();
  }, []);


  return (
    <SC_Common.Wrapper>
      <SC_Common.Content className="noOption">
        <Header title='calendar' />
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