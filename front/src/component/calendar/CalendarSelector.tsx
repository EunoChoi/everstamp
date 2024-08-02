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

import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { useQuery } from "@tanstack/react-query";
import { getHabit_status_month } from "@/app/(afterLogin)/_lib/habit";

const CalendarSelector = () => {
  const router = useRouter();
  const params = useSearchParams();
  const date = Number(params.get('date'));
  const weekTitle = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

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
    const emotion = result && result[2];
    const formattedDate = format(day, 'd');

    return <DateValue>
      {isDiaryExist && habitCount === 0 && <DateValue_Diary>
        {emotion === 0 && <Image src={emotion0} alt='angry' width={44} height={44} />}
        {emotion === 1 && <Image src={emotion1} alt='sad' width={44} height={44} />}
        {emotion === 2 && <Image src={emotion2} alt='common' width={44} height={44} />}
        {emotion === 3 && <Image src={emotion3} alt='happy' width={44} height={44} />}
        {emotion === 4 && <Image src={emotion4} alt='Joyful' width={44} height={44} />}
      </DateValue_Diary>}
      {isDiaryExist && habitCount > 0 && <DateValue_Diary>
        {emotion === 0 && <Image src={emotion0} alt='angry' width={44} height={44} />}
        {emotion === 1 && <Image src={emotion1} alt='sad' width={44} height={44} />}
        {emotion === 2 && <Image src={emotion2} alt='common' width={44} height={44} />}
        {emotion === 3 && <Image src={emotion3} alt='happy' width={44} height={44} />}
        {emotion === 4 && <Image src={emotion4} alt='Joyful' width={44} height={44} />}
        <div className="count">{habitCount}</div>
      </DateValue_Diary>}
      {!isDiaryExist && habitCount > 0 && <DateValue_Count>
        {habitCount}
      </DateValue_Count>}
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
        <CalTitle>
          <CalTitleText>
            <span className="month">{format(currentMonth, 'MMM')},</span>
            <span className="year">{format(currentMonth, 'yyyy')}</span>
          </CalTitleText>
          <CalHeaderButtons>
            <button onClick={subCurrentMonth}><KeyboardArrowLeftIcon fontSize="small" /></button>
            <button
              onClick={() => {
                router.push(`/app/calendar?date=${getCleanTodayTime()}`);
                setCurrentMonth(new Date());
              }}>
              <TodayIcon fontSize="small" />
            </button>
            <button onClick={addCurrentMonth}><KeyboardArrowRightIcon fontSize="small" /></button>
          </CalHeaderButtons>
        </CalTitle>
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

export default CalendarSelector;

const DateValue = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const DateValue_Date = styled.div`
  font-size: 12px;
  font-weight: 500;

  margin: 6px 0px;
`
const DateValue_Diary = styled.div`
  position: relative;

  width: 30px;
  height: auto;

  @media (min-width:1024px) { //desktop
    width: 24px;
  }

  .count{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    top: -12px;
    right: -8px;
  
    width: 22px;
    height: 22px;
    @media (min-width:1024px) { //desktop
      width: 18px;
      height: 18px;
      font-size: 11px;
    }
    border-radius: 30px;
    border : 2px solid rgba(0,0,0,0.1);
    
    font-size: 13px;
    color: white;
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
`
const DateValue_Count = styled.div`
  position: relative;

  width: 24px;
  height: 24px;
  @media (min-width:1024px) { //desktop
    width: 20px;
    height: 20px;
    font-size: 13px;
  }

  border-radius: 32px;
  border : 2px solid rgba(0,0,0,0.1);

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  color: white;
  background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
`


const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;
  display: flex;
  flex-direction: column;

  border: 2px solid rgba(0,0,0,0.05);
  border-radius: 8px;

  @media (max-width: 479px) { //mobile port
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
  }
  @media (min-width:1024px) { //desktop
    background-color: white;
  }
`

const CalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(var(--greyTitle));
  padding: 2px 12px;

  >div{
    font-size: 22px;
    .month{
      margin-left: 0px;
      font-weight: 700;
    }
    .year{
      font-weight: 500;
      color: grey;
      margin-left: 8px;
    }
  }
`
const CalTitleText = styled.div`
  width: auto;
  height: 100%;

  font-weight: 600;
  text-align: center;
  text-transform: capitalize;

  span{
    color: rgb(var(--greyTitle));
    font-size: 18px;
  }  
`
const CalWeekTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-transform: capitalize;
  padding: 6px 0;
  font-size: 16px;
  font-weight: 500;
  color: rgb(var(--greyTitle));

  span{
    width: 100%;
    text-align: center;
  }
`
const CalHeaderButtons = styled.div`
  button{
    margin-left: 16px;  
  }
`

const CalDate = styled.button`
  width: 14%;
  height: 95%;

  color: #666565;
  border : 3px solid rgba(0,0,0,0);
  &.today{
    background-color: ${(props) => props.theme.point ? props.theme.point + '20' : '#979FC7'};
    border-radius: 8px;
  }
  &.selected{
    border : 2px solid ${(props) => props.theme.point ? props.theme.point + '80' : '#979FC7'};
    border-radius: 8px;
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