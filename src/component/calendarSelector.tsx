import styled from "styled-components";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSearchParams } from "next/navigation"

import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays, isSameMonth, isSameDay } from 'date-fns';


//icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const CalendarSelector = () => {

  const router = useRouter();
  const params = useSearchParams();
  const date = params.get('date');

  const weekTitle = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });//일요일 시작 기준이라 월요일 시작 기준으로 처리 필요
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const [touchStartX, setTouchStartX] = useState<number>(0);  //for calendar touch gesture


  const addCurrentMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const subCurrentMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  let week = [];
  let sumOfWeek = [];
  let day = startDate;

  useEffect(() => {
    if (date) {
      const _date = new Date(Number(date));
      setSelectedDate(_date);
      setCurrentMonth(_date);
    }
  }, [date])

  while (day <= endDate) {
    const tempDay = day;
    week.push(
      <button
        key={format(day, 'mm dd')}
        onClick={() => {
          if (format(tempDay, 'M') < format(currentMonth, 'M')) subCurrentMonth();
          else if (format(tempDay, 'M') > format(currentMonth, 'M')) addCurrentMonth();
          else router.push(`/io/calendar?date=${tempDay.getTime()}`);
        }}
        className={`cal_date
          ${isSameMonth(day, currentMonth) ? 'currentMonth' : 'notCurrentMonth'}
          ${isSameDay(day, selectedDate) ? 'selected' : ''}
        `}>
        {format(day, 'd')}
      </button>);
    if (week.length === 7) {
      sumOfWeek.push(<div key={sumOfWeek.length} className="cal_week_row">{week}</div>);
      week = [];
    }
    day = addDays(day, 1);
  }



  return (
    <Wrapper>
      <Header>
        <div className="cal_title">
          <div>
            <span className="month">{format(currentMonth, 'MMMM')},</span>
            <span className="year">{format(currentMonth, 'yyyy')}</span>
          </div>
          <div className="cal_arrows">
            <button onClick={subCurrentMonth}><KeyboardArrowLeftIcon /></button>
            <button onClick={addCurrentMonth}><KeyboardArrowRightIcon /></button>
          </div>
        </div>
        <div className="cal_weeks">
          {weekTitle.map(e => <span key={e}>{e}</span>)}
        </div>
      </Header>
      <Body
        onTouchStart={(e) => {
          setTouchStartX(e.changedTouches[0].clientX);
        }}
        onTouchEnd={(e) => {
          const touchEndX = e.changedTouches[0].clientX;
          if (touchEndX - touchStartX > 150) subCurrentMonth();
          else if (touchStartX - touchEndX > 150) addCurrentMonth();
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

  /* padding: 8px; */
`
const Header = styled.div`
  .cal_title{
    display: flex;
    justify-content: space-between;
    color: rgb(var(--grey_Title));
    padding: 6px 0;
    >div{
      display: flex;
      font-size: 20px;
      .month{
      font-weight: 600;
      /* font-size: 28px; */
      }
      .year{
        font-weight: 500;
        /* font-size: 20px; */
        margin-left: 8px;
      }
    }
  }
  .cal_weeks{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 6px 0;
    font-size: 15px;
    >span{
      width: 14%;
      color: rgb(var(--grey_Title));
      font-weight: 500;
      text-align: center;
      text-transform: capitalize;
    }
  }
`
const Body = styled.div`
  /* height: 0%; */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .cal_week_row{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .cal_date{
    width: 14%;
    font-size: 14px;
    color: #666565;
    text-align: center;
  }
  .selected{
    font-weight: 600;
    color: rgb(var(--grey_Title));
    background-color: rgb(var(--point));
    border-radius: 8px;
  }
  .notCurrentMonth{
    color: #c8c8c8;
  }
`