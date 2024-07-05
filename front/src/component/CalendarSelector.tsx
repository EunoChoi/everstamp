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

import emotion0 from '../../public/img/emotion/emotion0.png'
import emotion1 from '../../public/img/emotion/emotion1.png'
import emotion2 from '../../public/img/emotion/emotion2.png'
import emotion3 from '../../public/img/emotion/emotion3.png'
import emotion4 from '../../public/img/emotion/emotion4.png'

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
      <span className={(isDiaryExist || habitCount > 0) ? 'diaryExist' : ''}>{formattedDate}</span>
      <div>
        {isDiaryExist && <span className="emotion">
          {emotion === 0 && <Image src={emotion0} alt='angry' width={30} height={30} />}
          {emotion === 1 && <Image src={emotion1} alt='sad' width={30} height={30} />}
          {emotion === 2 && <Image src={emotion2} alt='common' width={30} height={30} />}
          {emotion === 3 && <Image src={emotion3} alt='happy' width={30} height={30} />}
          {emotion === 4 && <Image src={emotion4} alt='Joyful' width={30} height={30} />}
        </span>}
        {habitCount > 0 && <span className="habitCount">{habitCount}</span>}
      </div>
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
  >span{
    font-size: 14px;
  }
  .diaryExist{
    display: none;
  }

  div{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    span{
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      line-height: 0%;

      width: 26px;
      height: 26px;
      border-radius: 26px;
      
      margin: 0 1px;
      @media (min-width:1024px) { //desktop
        width: 28px;
        height: 28px;
        border-radius: 28px;
      }
    }
    .habitCount{
      margin-top: 4px;
      font-size: 10px;
      font-weight: 500;
      width: 16px;
      height: 16px;
      border-radius: 16px;

      background-color: ${(props) => props.theme.point ? props.theme.point + 'c0' : '#979FC7'};
      color: white;

      @media (min-width:1024px) { //desktop
        width: 18px;
        height: 18px;
        border-radius: 18px;
        font-size: 12px;
      }
    }
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 350px;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    height: 90dvh !important;
    margin-bottom: 24px;
  }
`

//calendar header
const CalTitle = styled.div`
  display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(var(--greyTitle));
    padding: 2px 0;
    >div{
      /* display: flex; */
      font-size: 22px;
      .month{
        margin-left: 0px;
        font-weight: 700;
      }
      .year{
        font-weight: 500;
        color: grey;
        /* font-size: 20px; */
        margin-left: 8px;
      }
    }
`
const CalTitleText = styled.span`
  width: 14%;
  color: rgb(var(--greyTitle));
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;

  font-size: 1.2em;
`
const CalWeekTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-transform: capitalize;
  padding: 2px 0;
  font-size: 15px;
  font-weight: 500;
  color: rgb(var(--greyTitle));

  span{
    width: 100%;
    text-align: center;
  }
`
const CalHeaderButtons = styled.div`
  button{
      padding: 0px 4px;
      padding-bottom: 2px;
    }
    button:nth-child(2){
      margin: 0 8px;
    }
`

//calendar body

const CalDate = styled.button`
  width: 14%;
  height: 90%;

  font-size: 12px;
  color: #666565;
  text-align: center;
  border : 3px solid rgba(0,0,0,0);
  &.today{
    background-color: ${(props) => props.theme.point ? props.theme.point + '20' : '#979FC7'};
    border-radius: 8px;
  }
  &.selected{
    /* font-weight: 500; */
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