'use client';

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";

//function
import { getDiaryByDate } from "@/common/fetchers/diary";

//styledComponent
import $Common from "@/common/styles/common";

//component
import CommonBody from "@/common/components/layout/CommonBody";
import Calendar from "@/common/components/ui/Calendar";
import CalendarPageValue from "@/common/components/ui/Calendar/CalendarPageValue";
import Diary from "@/common/components/ui/Diary";
import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import useCustomRouter from "@/common/hooks/useCustomRouter";


interface Props {
  date: number;
}

const CalendarView = ({ date }: Props) => {
  const router = useCustomRouter();

  // const GoIntroText = () => (
  //   <div>
  //     <p>소개 페이지로 이동하시겠습니까?</p>
  //     <p style={{ fontSize: '15px', marginTop: '8px', color: '#DC7889' }}>🚨 소개 페이지 내부 '웹에서 실행하기' 버튼을 눌러 앱 화면으로 돌아올 수 있습니다.</p>
  //   </div>
  // );
  // const goIntro = () => {
  //   const action = (snackbarId: SnackbarKey) => (
  //     <>
  //       <$Common.YesOrNo className="no" onClick={() => {
  //         closeSnackbar('goIntro');
  //       }}>
  //         No
  //       </$Common.YesOrNo>
  //       <$Common.YesOrNo className="yes" onClick={() => {
  //         closeSnackbar('goIntro');
  //         router.push('/')
  //       }}>
  //         Yes
  //       </$Common.YesOrNo>
  //     </>
  //   );
  //   enqueueSnackbar(<GoIntroText />, { key: 'goIntro', persist: true, action, autoHideDuration: 6000 });
  // }

  const [displayDate, setDisplayDate] = useState(new Date());
  //get diary data by date
  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'calendar', format(date, 'yyMMdd')],
    queryFn: () => getDiaryByDate({ date }),
  });

  const todayRouterPushAction = () => {
    router.push(`/app/calendar?date=${getCleanTodayTime()}`);
  }

  //production mode에서만 동작, 정적 자료만 prefetch
  useEffect(() => {
    router.prefetch('/app/list');
    router.prefetch('/app/habit');
    router.prefetch('/app/setting');
  }, [])

  return (
    <$Common.Wrapper>
      <CalendarBody>
        <Content>
          <Calendar
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
            FormattedValue={CalendarPageValue}
            todayRouterPushAction={todayRouterPushAction}
            isTouchGestureEnabled={true}
            isDateSelectionEnabled={true}
          />
          <Diary type="small" diaryData={diaryData ? diaryData : { date: date }} />
        </Content>
      </CalendarBody>
    </$Common.Wrapper>
  );
}

export default CalendarView;

const Content = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 479px) { //mobile port
    gap: 12px;
    padding: 12px 5dvw;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    justify-content: start;
    padding: 24px 0;
    gap: 24px;
  }
  @media (min-width:1024px) { //desktop
    padding: 32px 0;
    gap: 24px;
  }
`
const CalendarBody = styled(CommonBody)`
  max-width: 500px;
`