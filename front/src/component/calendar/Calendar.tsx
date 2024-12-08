import styled from "styled-components";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation"

import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays, isSameMonth, isSameDay } from 'date-fns';


//icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TodayIcon from '@mui/icons-material/Today';

import emotion0 from '/public/img/emotion/emotion0.png'
import emotion1 from '/public/img/emotion/emotion1.png'
import emotion2 from '/public/img/emotion/emotion2.png'
import emotion3 from '/public/img/emotion/emotion3.png'
import emotion4 from '/public/img/emotion/emotion4.png'
import empty from '/public/img/emotion/empty.png'

import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { useQuery } from "@tanstack/react-query";
import { getHabit_status_month } from "@/function/fetch/habit";
import { useCustomRouter } from "@/function/customRouter";

const Calendar = () => {
  const router = useCustomRouter();
  const params = useSearchParams();
  const date = Number(params.get('date'));
  const weekTitle = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const emotions = [emotion0, emotion1, emotion2, emotion3, emotion4];
  const emotionNames = ['upset', 'sad', 'common', 'happy', 'joyful'];

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });//일요일 시작 기준이라 월요일 시작 기준으로 처리 필요
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const [touchStartX, setTouchStartX] = useState<number>(0);  //for calendar touch gesture

  const { data } = useQuery({
    queryKey: ['habit', 'month', format(currentMonth, 'MM')],
    queryFn: () => getHabit_status_month({ date: currentMonth }),
  });


  const monthHabitResult: { [key: string]: [number, boolean, number] } = {};
  data?.forEach((e: any) => {
    monthHabitResult[format(e.date, 'yyMMdd')] = [e?.Habits?.length, e?.visible, e?.emotion];
  });



  const addCurrentMonth = useCallback(() => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);
  const subCurrentMonth = useCallback(() => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }, [currentMonth]);


  const dateValue = (day: Date) => {
    const result = monthHabitResult[format(day, 'yyMMdd')];
    const habitCount = result && result[0];
    const isDiaryExist = result && result[1];
    const emotionIdx = result && result[2];
    const formattedDate = format(day, 'd');

    return <DateValue>
      {/* only emotion */}
      {isDiaryExist && habitCount === 0 && <DateValue_Diary>
        <Image priority src={emotions[emotionIdx]} alt={emotionNames[emotionIdx]} width={56} height={56} />
      </DateValue_Diary>}

      {/* emotion + habit count */}
      {isDiaryExist && habitCount > 0 && <DateValue_Diary>
        <Image priority src={emotions[emotionIdx]} alt={emotionNames[emotionIdx]} width={56} height={56} />
        <div className="count">{habitCount}</div>
      </DateValue_Diary>}

      {/* only habit count */}
      {!isDiaryExist && habitCount > 0 && <DateValue_Diary>
        <Image className="empty" priority src={empty} alt={emotionNames[emotionIdx]} width={56} height={56} />
        <div className="count">{habitCount}</div>
      </DateValue_Diary>}

      {/* none */}
      {!isDiaryExist && !habitCount && <DateValue_Date>{formattedDate}</DateValue_Date>}
    </DateValue>;
  };

  useEffect(() => {
    if (date) {
      let _date = new Date(date);
      setSelectedDate(_date);
      setCurrentMonth(_date);
    }
  }, [date])

  let week = [];
  let sumOfWeek = [];
  let day = startDate;

  while (day <= endDate) {
    const key = day.getTime();
    const cellDay = day;
    const realCurrentMonth = format(currentMonth, 'M');
    const cellMonth = format(cellDay, 'M');
    week.push(
      <CalDate
        key={key}
        onClick={() => {
          if (cellMonth < realCurrentMonth) subCurrentMonth();
          else if (cellMonth > realCurrentMonth) addCurrentMonth();
          else router.push(`/app/calendar?date=${cellDay.getTime()}`);
        }}
        className={`
          ${isSameDay(cellDay, today) ? 'today' : ''}
          ${isSameMonth(cellDay, currentMonth) ? 'currentMonth' : 'notCurrentMonth'}
          ${isSameDay(cellDay, selectedDate) ? 'selected' : ''}
        `}>
        {dateValue(cellDay)}
      </CalDate>);
    if (week.length === 7) {
      sumOfWeek.push(<CalRow key={sumOfWeek.length} className="cal_week_row">{week}</CalRow>);
      week = [];
    }
    day = addDays(day, 1);
  }

  return (
    <Wrapper>
      <header>
        <CalTitleWrapper>
          <CalHeaderButtons className="start">
            <button
              onClick={() => {
                router.push(`/app/calendar?date=${getCleanTodayTime()}`);
                setCurrentMonth(new Date());
              }}>
              <TodayIcon fontSize="small" />
            </button>
          </CalHeaderButtons>
          <CalTitleText>
            <span className="month">{format(currentMonth, 'yyyy.MM')}</span>
          </CalTitleText>
          <CalHeaderButtons className="end">
            <button onClick={subCurrentMonth}><KeyboardArrowLeftIcon fontSize="small" /></button>
            <button onClick={addCurrentMonth}><KeyboardArrowRightIcon fontSize="small" /></button>
          </CalHeaderButtons>
        </CalTitleWrapper>
        <CalWeekTitle>
          {weekTitle.map(e => <span key={e}>{e}</span>)}
        </CalWeekTitle>
      </header>
      <Body
        onTouchStart={(e) => {
          setTouchStartX(e.changedTouches[0].clientX);
        }}
        onTouchEnd={(e) => {
          const touchEndX = e.changedTouches[0].clientX;
          if (touchEndX - touchStartX > 100) subCurrentMonth();
          else if (touchStartX - touchEndX > 100) addCurrentMonth();
        }}>
        {sumOfWeek}
      </Body>
    </Wrapper>
  );
}

export default Calendar;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`

const DateValue = styled.div`
  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
  animation: fadeIn 300ms ease-in-out;

  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DateValue_Date = styled.div`
  font-size: 14px;
  font-weight: 500;

  margin: 6px 0px;
`
const DateValue_Diary = styled.div`
  position: relative;
  width: 75%;
  height: auto;
  display: flex;
  justify-content: center;


  @media (min-width:1024px) { //desktop
    width: 30px;
  }
  .empty{
    @media (max-width: 479px) { //mobile port
      opacity: 0.55;
    }
  }
  .count{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    top: -10px;
    right: -10px;
  
    width: 24px;
    height: 24px;

    border-radius: 24px;
    border : 2px solid white;
    
    font-size: 12px;
    font-weight: 500;
    color: white;
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    filter: brightness(110%) saturate(50%);
    @media (min-width:1024px) { //desktop
      top: -8px;
      right: -8px;
      font-size: 12px;
      width: 20px;
      height: 20px;
      border : none;
      /* border-color: #f6f6f6; */
    }
  }
`

const CalTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 2px 0px;
  >*{
    width: 30%;
  }
`
const CalTitleText = styled.div`  
  text-align: center;
  text-transform: capitalize;

  font-size: 20px;
  color: rgb(var(--greyTitle));

  .month{
    font-weight: 600;
  }
  .year{
    font-weight: 500;
    margin-left: 8px;
  }
`
const CalHeaderButtons = styled.div`
  color: rgb(var(--greyTitle));
  display: flex;
  &.start{
    justify-content: start;
  }
  &.end{
    justify-content: end;
  }
  button{
    padding: 0 8px;
  }
`

const CalWeekTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-transform: capitalize;
  padding: 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--greyTitle));

  span{
    width: 100%;
    text-align: center;
  }
`

const CalDate = styled.button`
  width: 14%;
  height: 85%;

  color: #666565;

  transition: border 400ms ease-in-out;

  border-top: 4px solid rgba(0,0,0,0);
  border-bottom: 4px solid rgba(0,0,0,0);

  &.today{
    border-bottom-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  &.selected{     
    border-bottom-color: ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};
  }
  &.notCurrentMonth{
    color: #c8c8c8;
  }
`
const CalRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`
const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`