import styled from "styled-components";

import { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation"

import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays, isSameMonth, isSameDay } from 'date-fns';


//icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TodayIcon from '@mui/icons-material/Today';

import { useQuery } from "@tanstack/react-query";
import { getHabit_single_status_month } from "@/app/(afterLogin)/_lib/habit";

interface Props {
  setHabitCount: (n: number) => void;
  currentMonth: Date;
  setCurrentMonth: (d: Date) => void;
}

const HabitInfoCalendar = ({ setHabitCount, currentMonth, setCurrentMonth }: Props) => {
  const params = useSearchParams(); //for habit id
  const habitId = params.get('id');

  const weekTitle = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const today = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });//일요일 시작 기준이라 월요일 시작 기준으로 처리 필요
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  let week = [];
  let sumOfWeek = [];
  let day = startDate;

  const { data } = useQuery({
    queryKey: ['habit', 'id', habitId, 'month', format(currentMonth, 'MM')],
    queryFn: () => getHabit_single_status_month({ id: habitId, date: currentMonth }),
  });

  const monthSingleHabitResult: { [key: string]: boolean } = {};
  data?.forEach((e: any) => {
    monthSingleHabitResult[format(e.date, 'yyMMdd')] = e?.Habits && true;
  });


  const addCurrentMonth = useCallback(() => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);
  const subCurrentMonth = useCallback(() => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }, [currentMonth]);


  const dateValue = (day: Date) => {
    const result = monthSingleHabitResult[format(day, 'yyMMdd')];
    const formattedDate = format(day, 'd');
    return <DateValue>
      <>{formattedDate}</>
      {result && <span className="isHabitExist"></span>}
    </DateValue>;
  };

  useEffect(() => {
    setHabitCount(data?.length);
  }, [data])

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
        }}
        className={`
          ${isSameDay(cellDay, today) ? 'today' : ''}
          ${isSameMonth(cellDay, currentMonth) ? 'currentMonth' : 'notCurrentMonth'}
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
      <Body>
        {sumOfWeek}
      </Body>
    </Wrapper>
  );
}

export default HabitInfoCalendar;

const DateValue = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span{
    font-weight: 500;
    color: rgb(var(--greyTitle));
  }
  .isHabitExist{
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    line-height: 0%;

    width: 14px;
    height: 14px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    color: whitesmoke;
    margin: 0 1px;
  }
`

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
    padding: 4px 0;
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
    background-color: ${(props) => props.theme.point ? props.theme.point + '35' : '#979FC7'};
    border-radius: 8px;
  }
  &.selected{
    /* font-weight: 500; */
    border : 3px solid ${(props) => props.theme.point ? props.theme.point + '80' : '#979FC7'};
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