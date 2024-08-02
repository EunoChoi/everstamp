'use client';

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from 'date-fns';


import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import DiaryHabits from "./Diary_Habits";
import DiarySlide from "./Diary_Slide";
import IsMobile from "@/function/IsMobile";

interface ImageProps {
  id: string;
  src: string;
}

interface Habit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  priority: number;
}

interface Props {
  position: 'calendar' | 'list';
  diaryData: {
    email: string;
    id: number;
    date: Date;
    text: string;
    emotion: number;
    Images: Array<ImageProps>;
    Habits: Array<Habit>;
    visible: boolean;
  };
}

//날짜만 프롭으로 받아오면 그걸로 검색해서 데이터 패칭
const Diary = ({ diaryData, position }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const paramDate = params.get('date');

  const isMobile = IsMobile();

  const emotions = ['#Angry', '#Sad', '#Common', '#Happy', '#Joyful'];

  const [diaryDate, setDiaryDate] = useState<Date>(new Date());
  const date = format(diaryDate, 'MMM d yyyy');
  const day = format(diaryDate, `${(position === 'calendar' && isMobile === false) ? 'eeee' : 'eee'}`);


  const onAddDiary = () => {
    router.push(`/app/inter/input/addDiary?date=${diaryDate.getTime()}`, { scroll: false })
  }


  useEffect(() => {
    if (position === 'calendar' && paramDate) {
      setDiaryDate(new Date(Number(paramDate)));
    }
    else if (position === 'list') {
      setDiaryDate(diaryData.date);
    }
  }, [paramDate, diaryData])

  return (
    <Wrapper className={position}>
      <DateWrapper className={position}>
        <span className="week">{day}</span>
        <div className="dateAndEmotion">
          <span>{date}</span>
          <span className="emotion">{diaryData?.visible && emotions[diaryData?.emotion]}</span>
        </div>
      </DateWrapper>

      <DiaryHabits habits={diaryData?.Habits} />

      {diaryData?.visible ?
        <DiarySlide diaryData={diaryData} position={position} /> :
        <EmptyWrapper>
          <button onClick={onAddDiary}>
            <AddCircleOutlinedIcon fontSize="inherit" />
          </button>
        </EmptyWrapper>}
    </Wrapper >);
}

export default Diary;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  flex-grow: 1;

  background-color: #f9f9f9;
  box-sizing: border-box;
  border: 2px solid rgba(0,0,0,0.05);
  border-radius: 8px;
  margin-bottom: 20px;

  button{
    transition: color ease-in-out 0.2s;
    line-height: 50%;
    font-size: 48px;
    color: rgb(var(--greyTitle));
    &:hover{
      color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    }
  }

  @media (max-width: 479px) { //mobile port
    margin-left: 5dvw;
    margin-right: 5dvw;
    width: 90dvw;
  }
  @media (min-width:1024px) { //desktop
    margin-bottom: 28px;
    button{
      font-size: 72px;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  width: 100%;
  max-width: 600px;
  height: 250px;
  margin-top: 10px;

  @media (min-width: 1024px) {//desktop
    margin-top: 30px;
    height: 300px;
    &.calendar{
      height: 550px;
    }
  }
`
const DateWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: end;

  @media (max-width: 479px) { //mobile port
    padding-left : 5dvw;
    padding-right: 5dvw;
  }
  
  .week{
    font-size: 26px;
    font-weight: 700;
    color: rgb(var(--greyTitle));
    margin-right: 8px;
    line-height : 1;
  }
  .dateAndEmotion{
    height: 100%;
    display:flex;
    align-items: end;
    span{
      line-height: 1;
      margin-right: 8px;
      font-weight: 500;
      text-transform: capitalize;
      color: grey;
      font-size: 22px;
    }
    .emotion{
      color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    }
  }

  &.calendar{
    @media (min-width:480px) and (min-width:1024px) { //desktop
      flex-direction: column;
      align-items: start;
      .week{
        margin-bottom: 14px;
        font-size: 56px;
      }
      .dateAndEmotion{
        span{
          font-size: 36px;
        }
      }
    }
  }
`