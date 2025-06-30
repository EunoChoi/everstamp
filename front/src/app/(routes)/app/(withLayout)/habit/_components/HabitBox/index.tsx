'use client';

import styled from "styled-components";


import { getSingleHabitFourDayInfo } from "@/common/fetchers/habit";
import { getCleanTodayTime } from "@/common/functions/getCleanTodayTime";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";
import { ChangeEvent } from "react";

import { StarRating } from "@/common/components/ui/StarRating";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import $Common from "@/common/styles/common";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import useHabitAction from "./utils/useHabitAction";


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

  return (<Wrapper>
    <StarRating rating={priority + 1} />
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
      <button onClick={() => router.push(`/app/inter/habitInfo?id=${id}`, { scroll: false })}>
        <InsertChartOutlinedIcon fontSize="small" />
      </button>
      <button onClick={() => router.push(`/app/inter/input/editHabit?id=${id}`, { scroll: false })}>
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
  justify-content: center;
  align-items: center;
  
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  border: 2px solid ${(props) => props.theme.point ? props.theme.point + 70 : '#979FC7'};

  width: 100%;
  aspect-ratio: 0.85;
  gap: 12px;
`
const Name = styled.div`
  width: 100%;
  height: auto;
  
  font-weight: 500;
  font-size: var(--font-size-base);
  color: rgb(var(--greyTitle));
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  span{
    white-space: nowrap;
    overflow: scroll;
    max-width: 90%;
  }
`
const Days = styled.div`
  width: 100%;
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
      color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
    }
  }
  .date{
    margin: 2px 0;
    @media ((max-height: 479px) and (min-width:480px) and (max-width:1024px)) { //only mobild land
      margin: 2px 0;
    }
  }
  .week{
    font-weight: 500;
    color: rgb(var(--greyTitle)) !important;
    @media ((max-height: 479px) and (min-width:480px) and (max-width:1024px)) { //only mobild land
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

        @media ((max-height: 479px) and (min-width:480px) and (max-width:1024px)) { //only mobild land
          height: 8px;
          width: 8px;
        }
      }

      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      @media ((max-height: 479px) and (min-width:480px) and (max-width:1024px)) { //only mobild land
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
      color: rgb(var(--greyTitle));
    }
  }
`
