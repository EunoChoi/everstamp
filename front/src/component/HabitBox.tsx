'use client';

import styled from "styled-components";


//icon
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import { subDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import Axios from "@/Aixos/aixos";
import { getCurrentUserEmail } from "@/function/getCurrentUserEmail";
import { useQuery } from "@tanstack/react-query";
import { getRecentHabitStatus } from "@/app/(afterLogin)/_lib/getRecentHabitStatus";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

interface Props {
  name: string;
  id: number;
  email: string;
}

const HabitBox = ({ name, id, email }: Props) => {

  const router = useRouter();

  const currentCleanDateTime = getCleanTodayTime()
  const currentDate = new Date();
  let recentDateArray = new Array(4).fill(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  recentDateArray = recentDateArray.map((e, i) => subDays(e, i));



  const { data: recentDateStatus } = useQuery({
    queryKey: ['habit', name, 'recent'],
    queryFn: () => getRecentHabitStatus(email, id, currentCleanDateTime),
    enabled: email !== null
  });


  //check, uncheck 처리
  const habitToggle = (e: ChangeEvent<HTMLInputElement>, date: number) => {
    if (e.currentTarget.checked === true) {
      //habit diary model add relation 
      Axios.post('/habit/check', { id, date, email });
      console.log('check')
    }
    else {
      //habit diary model delete relation 
      Axios.delete('/habit/check', {
        data: { id, date, email }
      });
      console.log('unchecked');
    }
  }

  return (<Wrapper>
    <Name>{name}</Name>
    <Days>
      {recentDateArray.map((date, i: number) => {
        return <Check key={`${date}-${name}`}>
          <label htmlFor={`${date}-${name}`}>
            <span>{format(date, 'eee')}</span>
            <span>{format(date, 'd')}</span>
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
      <button onClick={() => router.push('/app/inter/input/editHabit', { scroll: false })}>
        <SettingsOutlinedIcon fontSize="small" />
      </button>
    </ButtonWrapper>
  </Wrapper >);
}

export default HabitBox;
const ButtonWrapper = styled.div`
  width: 100%;
  height: 30%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #b9b9b9;
`
const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  
  border-radius: 16px;
  background-color: whitesmoke;
  border: 1px solid rgba(0,0,0,0.05);

  display: flex;
  flex-direction: column;
`
const Name = styled.span`
  width: 100%;
  height: 30%;

  font-size: 22px;
  font-weight: 600;
  color: rgb(var(--greyTitle));

  text-transform: capitalize;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 479px) { //mobile port
    font-size: 18px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 14px;
  }
`
const Days = styled.div`
  width: 100%;
  height: 40%;
  font-size: 16px;
  

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  label{
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    font-size: 14px;
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

      display: flex;
      justify-content: center;
      align-items: center;
    }
    input:checked ~ .checkmark{
      div{
        flex-shrink: 0;

        width: 12px;
        height: 12px; 
        border-radius: 20px;
        background-color: rgb(var(--point));
      }    
      
    }
    span:first-child{
      font-weight: 600;
      color: rgb(var(--greyTitle));
    }
  }
`