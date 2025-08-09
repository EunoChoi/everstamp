'use client';

import { format } from "date-fns";
import React from "react";
import styled from "styled-components";

import Diary from "@/common/components/ui/Diary";
import { DiaryWithRelations } from "@/server/types";


interface DiariesProps {
  diaries: DiaryWithRelations[];
}

export const Diaries = ({ diaries }: DiariesProps) => {
  return (<>
    {diaries?.map((diary: DiaryWithRelations, i: number) => {
      const currentDiaryDate = format(diary.date, 'MMMM. yyyy');
      const previousDiaryDate = i > 0 ? format(diaries[i - 1].date, 'MMMM. yyyy') : '';

      if (currentDiaryDate !== previousDiaryDate) {
        return <React.Fragment key={'listNote' + i}>
          <MonthSeparator>{currentDiaryDate}</MonthSeparator>
          <DiaryWrapper><Diary diaryData={diary} /></DiaryWrapper>
        </React.Fragment>
      }
      else {
        return <DiaryWrapper key={'listNote' + i}>
          <Diary diaryData={diary} />
        </DiaryWrapper>
      }
    })}
  </>);
}


const DiaryWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
`

const MonthSeparator = styled.span`
  margin: 16px 0;

  display: flex;
  justify-content: start;
  align-items: center;

  text-transform: capitalize;
  color: rgb(var(--greyTitle));
  font-size: 32px;
  font-family: 'BMJUA';
  width: 100%;

  @media (max-width: 479px) { //mobile port
    width: 90dvw;
  }

  @media (min-width:1025px) { //desktop
    font-size: 36px;
    margin : 28px 0;
  }

`
const NoDiaries = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap : 32px;


  color: rgb(var(--greyTitle));

  @media (max-width: 479px) { //mobile port
    font-size: 18px;  
    padding-top: 25dvh;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 18px;
    padding-top: 32px;
  }
  @media (min-width:1024px) { //desktop
    font-size: 22px;
    padding-top: 25dvh;
  }
`