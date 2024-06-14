import styled from "styled-components";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation"

import { format, addMonths, subMonths, sub } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays, isSameMonth, isSameDay } from 'date-fns';


//icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TodayIcon from '@mui/icons-material/Today';


import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';

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


  const getCleanTodayTime = useCallback(() => {
    const tempDate = new Date();
    return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()).getTime();
  }, []);
  const addCurrentMonth = useCallback(() => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);
  const subCurrentMonth = useCallback(() => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }, [currentMonth]);

  const dateValue = (day: Date) => {
    //<SentimentVeryDissatisfiedTwoToneIcon></SentimentVeryDissatisfiedTwoToneIcon>
    //<SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon> 
    return format(day, 'd');
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
    const tempDay = day;
    week.push(
      <CalDate
        key={day.getTime()}
        onClick={() => {
          if (format(tempDay, 'M') < format(currentMonth, 'M')) subCurrentMonth();
          else if (format(tempDay, 'M') > format(currentMonth, 'M')) addCurrentMonth();
          else router.push(`/io/calendar?date=${tempDay.getTime()}`);
        }}
        className={`
          ${isSameDay(day, today) ? 'today' : ''}
          ${isSameMonth(day, currentMonth) ? 'currentMonth' : 'notCurrentMonth'}
          ${isSameDay(day, selectedDate) ? 'selected' : ''}
        `}>
        {dateValue(day)}
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
            <button onClick={subCurrentMonth}><KeyboardArrowLeftIcon /></button>
            <button onClick={() => {
              router.push(`/io/calendar?date=${getCleanTodayTime()}`);
              setCurrentMonth(new Date());
            }}><TodayIcon /></button>
            <button onClick={addCurrentMonth}><KeyboardArrowRightIcon /></button>
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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

//calendar header
const CalTitle = styled.div`
  display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(var(--greyTitle));
    padding: 6px 0;
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
`
const CalWeekTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-transform: capitalize;
  padding: 6px 0;
  font-size: 15px;
  font-weight: 500;
  color: rgb(var(--greyTitle));
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

  font-size: 14px;
  color: #666565;
  text-align: center;
  border : 3px solid rgba(0,0,0,0);
  &.today{
    font-weight: 500;
    color: rgb(var(--greyTitle));
    background-color: rgba(var(--point2), 0.5);
    border-radius: 8px;
  }
  &.selected{
    font-weight: 500;
    border : 3px solid rgba(var(--point2), 0.6);
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