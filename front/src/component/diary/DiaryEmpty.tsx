'use client';

import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from 'date-fns';


import IsMobile from "@/function/IsMobile";


//icon
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

const DiaryEmpty = () => {

  const router = useRouter();
  const params = useSearchParams();

  const paramDate = params.get('date');
  const dateInfo = paramDate ? new Date(Number(paramDate)) : new Date();

  const month = format(dateInfo, 'MMM');
  const date = format(dateInfo, 'dd');
  const day = format(dateInfo, `eeee`);
  const year = format(dateInfo, 'yyyy');

  const habits = [];

  return (
    <Wrapper>
      <DateWrapper className="dateinfo calendar">
        <span className="week">{day}</span>
        <div>
          <span className="date">{month}</span>
          <span className="date">{date},</span>
          <span className="year">{year}</span>
        </div>
      </DateWrapper>

      <EmptyWrapper>
        <span>There are no diary yet.</span>
        <span>Create a new one :)</span>
        <button onClick={() => {
          router.push(`/app/inter/input/addDiary?date=${dateInfo.getTime()}`, { scroll: false })
        }}>
          <AddCircleOutlinedIcon fontSize="inherit" />
        </button>
      </EmptyWrapper>
    </Wrapper >);
}

export default DiaryEmpty;

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
    height: 550px;
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
  font-size: 18px;
  font-weight:500;
  margin-top: 16px;

  button{
    transition: color ease-in-out 0.2s;
    line-height: 50%;
    font-size: 48px;
    color: rgb(var(--greyTitle));
    padding: 8px;
    padding-top: 16px;
    &:hover{
      color: rgb(var(--point));
    }
  }

  @media (min-width:480px) and (min-width:1024px) { //desktop
    height: 500px;
    font-size: 56px;
    margin-top: 32px;
    span{ 
      font-size: 20px;
    }
  }
`

