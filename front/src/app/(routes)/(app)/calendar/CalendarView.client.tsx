'use client';

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import styled from "styled-components";

//function
import { getDiaryByDate } from "@/common/fetchers/diary";
import { createEmptyDiary } from "@/common/types/diary";

//styledComponent

//component
import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import Calendar from "@/common/components/ui/Calendar";
import Diary from "@/common/components/ui/Diary";
import { getMonthlyHabitsStatus } from "@/common/fetchers/habit";
import { getTodayString } from "@/common/functions/getTodayString";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { useRouter } from "next/navigation";
import { RenderDateContent } from "./_utils/CalendarInfoDateContent";


interface CalendarViewProps {
  date: string; // 'yyyy-MM-dd'
}
interface MonthHabitsType {
  [key: string]: { habitsCount: number, isVisible: boolean, emotionType: number };
}

const CalendarView = ({ date }: CalendarViewProps) => {
  usePrefetchPage();
  const router = useRouter();

  const [displayDate, setDisplayDate] = useState(new Date());

  //get date diary data
  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'calendar', date], // date는 이미 'yyyy-MM-dd' string
    queryFn: () => getDiaryByDate({ date }),
  });

  const { data: monthHabits } = useQuery({
    queryKey: ['habit', 'month', format(displayDate, 'yyyy-MM')],
    queryFn: () => getMonthlyHabitsStatus({ month: format(displayDate, 'yyyy-MM') }),
    select: (data) => { //select 옵션 덕분에 가공한 데이터도 캐시에 저장된다., 데이터를 가져올때마다 매번 가공 x
      const monthHabits: MonthHabitsType = {};
      data.forEach((e: any) => {
        monthHabits[format(e.date, 'yyMMdd')] = { habitsCount: e?.Habits?.length, isVisible: e?.visible, emotionType: e?.emotion };
      });
      return monthHabits;
    }
  });

  const onClickMonthTitle = () => {
    router.push(`/calendar?date=${getTodayString()}`);
  }
  const onClickDate = useCallback((date: Date) => {
    router.push(`calendar?date=${format(date, 'yyyy-MM-dd')}`);
  }, [router]);

  return (
    <PageWrapper>
      <ContentWrapper $gap={12} $mobileGap={20} $tabletGap={24} $flex="1 1 0" $paddingTop={24}>
        <CalendarPageCalendar
          isTouchGestureEnabled={true}
          isDateSelectionEnabled={true}
          headerTitlePosition="start"
          headerSize="large"

          displayDate={displayDate}
          setDisplayDate={setDisplayDate}
          monthlyData={monthHabits}
          RenderDateContent={RenderDateContent}

          onClickMonthTitle={onClickMonthTitle}
          onClickDate={onClickDate}
        />
        <DiaryWrapper>
          <Diary type="small" diaryData={diaryData ?? createEmptyDiary(date)} />
        </DiaryWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default CalendarView;

const CalendarPageCalendar = styled(Calendar)`
  flex: 1 1 0;
  min-height: 520px;
  overflow: visible;
  
  @media (max-width: 479px) {
    min-height: 480px;
  }
`

const DiaryWrapper = styled.div`
  flex-shrink: 0;
`