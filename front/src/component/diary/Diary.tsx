'use client';

import styled from "styled-components";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from 'date-fns';




//icon
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


//img
import IsMobile from "@/function/IsMobile";
import DiaryHabits from "./Diary_Habits";
import DiarySlide from "./Diary_Slide";

interface ImageProps {
  id: string;
  src: string;
}

interface Habit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  themeColor: string;
}

interface Props {
  position: 'calendar' | 'list';
  diaryData: {
    email: string;
    id: number;
    date: Date;
    text: string;
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

  const [diaryDate, setDiaryDate] = useState<Date>(new Date());

  const month = format(diaryDate, 'MMM');
  const date = format(diaryDate, 'dd');
  const day = format(diaryDate, `${position === 'calendar' ? 'eeee' : 'eee'}`);
  const year = format(diaryDate, 'yyyy');

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
        <div>
          <span className="date">{month}</span>
          <span className="date">{date},</span>
          <span className="year">{year}</span>
        </div>
      </DateWrapper>

      <DiaryHabits habits={diaryData?.Habits} />

      {diaryData?.visible ?
        <DiarySlide diaryData={diaryData} position={position} /> :
        <EmptyWrapper>
          <span>There are no diary yet.</span>
          <span>Create a new one :)</span>
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

  background-color: whitesmoke;
  color: rgb(var(--greyTitle));
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 8px;
  font-size: 16px;
  font-weight:500;

  button{
    transition: color ease-in-out 0.2s;
    line-height: 50%;
    font-size: 48px;
    color: rgb(var(--greyTitle));
    padding: 8px;
    padding-top: 16px;
    &:hover{
      color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
    }
  }

  @media (min-width:480px) and (min-width:1024px) { //desktop
    height: 500px;
    font-size: 56px;
    span{ 
      font-size: 20px;
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
  height: 300px;
  margin: 12px 0;

  @media (min-width: 1024px) {//desktop
    height: 350px;
    &.calendar{
      height: 550px;
    }
  }
`
const DateWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  .date, .year, .week{
    line-height: 1;
    margin-right: 8px;
    font-weight: 600;
    text-transform: capitalize;
    color: grey;
    font-size: 22px;

  }
  .week{
    font-size: 32px;
    font-weight: 700;
    color: rgb(var(--greyTitle));
  }

  &.calendar{
    @media (min-width:480px) and (min-width:1024px) { //desktop
      flex-direction: column;
      align-items: start;
      .week{
        font-size: 56px;
        margin-bottom: 12px;
      }
      span{
        font-size: 36px;
      }
    }
  }
`