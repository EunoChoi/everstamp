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

const Calendar = () => {
  const isMobile = IsMobile();
  const router = useRouter();
  const params = useSearchParams();
  const date = params.get('date');


  return (
    <SC_Common.Wrapper>
      <Header />
      <SC_Common.Options>
        <button
          onClick={() => {
            router.push(`/io/calendar?date=${new Date().getTime()}`);
          }}>
          <TodayIcon fontSize="small" />
          <span>today</span>
        </button>
      </SC_Common.Options>
      <SC_Common.Content>

        {isMobile &&
          <CalendarWrapper>
            <CalendarSelector></CalendarSelector>
          </CalendarWrapper>}

        <Diary isCalendar={true} dateInfo={Number(date)} />
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
  padding: 12px 0;
`