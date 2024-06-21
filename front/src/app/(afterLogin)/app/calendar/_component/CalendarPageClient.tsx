'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

//function
import IsMobile from "@/function/IsMobile";
import { getDiaryCalendar } from "@/app/(afterLogin)/_lib/getDiaryCalendar";
import { getCurrentUserEmail } from "@/function/getCurrentUserEmail";

//styledComponent
import SC_Common from "@/style/common";

//component
import DiaryInCalendar from "@/component/DiaryInCalendar";
import DiaryEmpty from "@/component/DiaryEmpty";
import CalendarSelector from "@/component/CalendarSelector";

//icon
import Header from "@/component/Header";
import { useQuery } from "@tanstack/react-query";

interface Props {
  email: string;
  date: number;
}

const CalendarPageClient = ({ email, date }: Props) => {
  // console.log(email, date);

  const isMobile = IsMobile();
  const router = useRouter();

  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'calendar', email, date],
    queryFn: () => getDiaryCalendar(email, date),
    enabled: email !== null
  });

  return (
    <SC_Common.Wrapper>
      <SC_Common.Content className="noOption">
        <Header title='calendar' />
        {isMobile &&
          <CalendarWrapper>
            <CalendarSelector />
          </CalendarWrapper>}
        {diaryData ? <DiaryInCalendar diaryData={diaryData} /> : <DiaryEmpty />}

      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default CalendarPageClient;

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