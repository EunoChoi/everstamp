'use client';

import styled from "styled-components";


import { subDays, format } from "date-fns";
import { ChangeEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleHabitFourDayInfo } from "@/common/fetchers/habit";
import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import $Common from "@/common/styles/common";
import useHabitAction from "./utils/useHabitAction";
import useCustomRouter from "@/common/hooks/useCustomRouter";


interface Props {
  name: string;
  id: number;
  priority: number;
}

const HabitBox = ({ name, id, priority }: Props) => {

  const router = useCustomRouter();
  const { checkHabit, uncheckHabit, deleteHabit } = useHabitAction();

  const currentCleanDateTime = getCleanTodayTime()
  const currentDate = new Date();
  let recentDateArray = new Array(4).fill(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  recentDateArray = recentDateArray.map((e, i) => subDays(e, i));

  const { data: recentDateStatus } = useQuery({
    queryKey: ['habit', name, 'recent'],
    queryFn: () => getSingleHabitFourDayInfo({ id, date: currentCleanDateTime }),
  });

  const onDeleteHabit = () => {
    const action = (snackbarId: SnackbarKey) => (
      <>
        <$Common.YesOrNo className="no" onClick={() => {
          closeSnackbar('deleteHabit');
        }}>No</$Common.YesOrNo>
        <$Common.YesOrNo className="yes" onClick={() => {
          deleteHabit.mutate({ habitId: id });
          closeSnackbar('deleteHabit');
        }}>Yes</$Common.YesOrNo>
      </>
    );
    enqueueSnackbar(`습관 항목(${name})을 지우시겠습니까?`, { key: 'deleteHabit', persist: true, action, autoHideDuration: 6000 });
  }
  const habitToggle = (e: ChangeEvent<HTMLInputElement>, date: number) => {
    if (e.currentTarget.checked === true) {
      checkHabit.mutate({ habitId: id, date });
    }
    else {
      uncheckHabit.mutate({ habitId: id, date });
    }
  }

  return (<Wrapper className={`${priority ? 'priority' + priority : ''}`}>
    <Name><span>{name}</span></Name>
    <Days>
      {recentDateArray.map((date, i: number) => {
        return <Check key={`${date}-${name}`}>
          <label htmlFor={`${date}-${name}`}>
            <span className="week">{format(date, 'eee')}</span>
            <span className="date">{format(date, 'd')}</span>
            <input
              id={`${date}-${name}`}
              type="checkbox"
              checked={(recentDateStatus && recentDateStatus[i]) || ""}
              onChange={(e) => {
                habitToggle(e, date.getTime());
              }} />
            <div className="checkmark"><div></div></div>
          </label>
        </Check>
      })}
    </Days>
    <ButtonWrapper>
      <button onClick={() => router.push(`/main/inter/habitInfo?id=${id}`, { scroll: false })}>
        <InsertChartOutlinedIcon fontSize="small" />
      </button>
      <button onClick={() => router.push(`/main/inter/input/editHabit?id=${id}`, { scroll: false })}>
        <EditOutlinedIcon fontSize="small" />
      </button>
      <button onClick={onDeleteHabit}>
        <DeleteForeverOutlinedIcon fontSize="small" />
      </button>
    </ButtonWrapper>
  </Wrapper >);
}

export default HabitBox;
const ButtonWrapper = styled.div`
  width: 100%;
  height: 30%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #b9b9b9;
  button{
    margin : 0 6px;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  
  border-radius: 20px;
  background-color: #f9f9f9;
  border: 2px solid rgba(0,0,0,0.075);

  @media (max-width: 479px) { //mobile port
    width: calc(46dvw - 3px);
    aspect-ratio: 1;
  }
  @media (min-width:480px) and (max-width:1023px) { //tablet
    width: 160px;
    aspect-ratio: 1;
  }
  @media (min-width:480px) and (max-width:1023px) and (max-height:480px){ //mobile land only
    width: auto;
    height: 37dvh;
    aspect-ratio: 1;
  }
  @media (min-width:1024px) { //desktop
    width: 200px;
    aspect-ratio: 1;
  }
`
const Name = styled.span`
  width: 100%;
  height: 30%;
  height: auto;
  
  font-weight: 600;
  color: rgb(var(--greyTitle));

  /* text-transform: capitalize; */
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  span{
    white-space: nowrap;
    overflow: scroll;
    max-width: 90%;
  }

  @media (max-width: 479px) { //mobile port
    font-size: 16px;
  }
  @media (min-width:480px) and (max-width:1023px) { // tablet
    font-size: 16px;
  }
  @media ((max-height: 479px) and (min-width:480px) and (max-width:1023px)) { //only mobild land
    font-size: 14px;
  }
  @media (min-width:1024px) { //desktop
    font-size: 18px;
    span{
      max-width: 180px;
    }
  }
`
const Days = styled.div`
  width: 100%;
  height: 40%;
  height: auto;
  
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  &:first-child{
    .week{
      color: rgb(var(--greyTitle)) !important;
      font-weight: 700;
    }
  }
  .date{
    margin: 6px 0;
    @media ((max-height: 479px) and (min-width:480px) and (max-width:1023px)) { //only mobild land
      margin: 3px 0;
    }
  }
  .week{
    color: grey !important;
    @media ((max-height: 479px) and (min-width:480px) and (max-width:1023px)) { //only mobild land
      font-size: 13px;
    }
  }

  label{
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    font-size: 13px;
    font-weight: 500;
    color: grey;

    input{
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .checkmark{
      
      height: 20px;
      width: 20px;
      border-radius: 25px;
      border : solid darkgrey 2px;

      div{
        transition: all ease-in-out 0.4s;

        flex-shrink: 0;
        width: 12px;
        height: 12px; 
        border-radius: 20px;

        @media ((max-height: 479px) and (min-width:480px) and (max-width:1023px)) { //only mobild land
          height: 8px;
          width: 8px;
        }
      }

      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      @media ((max-height: 479px) and (min-width:480px) and (max-width:1023px)) { //only mobild land
        height: 16px;
        width: 16px;
      }
    }
    input:checked ~ .checkmark{
      div{
        background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
      }    
    }
    span:first-child{
      font-weight: 600;
      color: rgb(var(--greyTitle));
    }
  }
`
