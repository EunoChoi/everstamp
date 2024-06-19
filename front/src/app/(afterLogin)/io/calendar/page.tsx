'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

//function
import IsMobile from "@/funcstion/IsMobile";
import { getDiaryCalendar } from "../../_lib/getDiaryCalendar";
import { getCurrentUserEmail } from "@/funcstion/getCurrentUserEmail";

//styledComponent
import SC_Common from "@/style/common";

//component
import DiaryCalendar from "@/component/DiaryCalendar";
import DiaryEmpty from "@/component/DiaryEmpty";
import CalendarSelector from "@/component/CalendarSelector";

//icon
import Header from "@/component/Header";
import { useQuery } from "@tanstack/react-query";



const Calendar = () => {
  const isMobile = IsMobile();
  const router = useRouter();

  const email = getCurrentUserEmail();
  const params = useSearchParams();
  const date = Number(params.get('date'));

  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'calendar', date],
    queryFn: () => getDiaryCalendar({ email: 'pixel@kakao.com', date }),
  });

  return (
    <SC_Common.Wrapper>
      <SC_Common.Content className="noOption">
        <Header title='calendar' />
        {isMobile &&
          <CalendarWrapper>
            <CalendarSelector />
          </CalendarWrapper>}
        {diaryData ? <DiaryCalendar diaryData={diaryData} /> : <DiaryEmpty />}

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