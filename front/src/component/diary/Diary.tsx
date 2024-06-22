'use client';

import styled from "styled-components";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';




//icon
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

//img
import IsMobile from "@/function/IsMobile";
import { deleteDiary } from "@/app/(afterLogin)/_lib/deleteDiary";
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
  };
}

//날짜만 프롭으로 받아오면 그걸로 검색해서 데이터 패칭
const Diary = ({ diaryData, position }: Props) => {
  const router = useRouter();
  const dateInfo = diaryData?.date;

  const month = format(dateInfo, 'MMM');
  const date = format(dateInfo, 'dd');
  const day = format(dateInfo, `${position === 'calendar' ? 'eeee' : 'eee'}`);
  const year = format(dateInfo, 'yyyy');


  const habits = diaryData?.Habits;


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

      <DiaryHabits habits={habits} />
      <DiarySlide diaryData={diaryData} position={position}></DiarySlide>
    </Wrapper >);
}

export default Diary;

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  width: 100%;
  max-width: 600px;
  height: 300px;
  margin: 20px 0;

  @media (min-width: 1024px) {//desktop
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
    font-size: 24px;

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