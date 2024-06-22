'use client';

import styled from "styled-components";


//icon
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import { subDays, format } from "date-fns";
import { useRouter } from "next/navigation";

const HabitBox = () => {

  const router = useRouter();
  const currentDate = new Date();
  let fourDate = new Array(4).fill(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  fourDate = fourDate.map((e, i) => subDays(e, i));

  return (<Wrapper>
    <Name>habit name</Name>
    <Days>
      {fourDate.map((e, i) => {
        return <Check key={`${e}-${i}`}>
          <label htmlFor={`${e}-${i}`}>
            <span>{format(e, 'eee')}</span>
            <span>{format(e, 'e')}</span>
            <input id={`${e}-${i}`} type="checkbox" />
            <div className="checkmark"><div></div></div>
          </label>
        </Check>
      })}
    </Days>
    <ButtonWrapper>
      <button onClick={() => router.push('/app/inter/input/editHabit', { scroll: false })}>
        <ModeEditOutlineOutlinedIcon fontSize="small" />
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
      height: 18px;
      width: 18px;
      border-radius: 25px;
      border : solid darkgrey 2px;
      
    }
    input:checked ~ .checkmark{
      /* border : solid white 3px; */
      display: flex;
      justify-content: center;
      align-items: center;
      div{
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: rgb(var(--point));
      }
    }
    span:first-child{
      font-weight: 600;
      color: rgb(var(--greyTitle));
    }

    @media (min-width:480px) and (min-width:1024px) { //desktop
      font-size: 18px;
      .checkmark{
        border : solid darkgrey 3px;
        height: 22px;
        width: 22px;
      }
      input:checked ~ .checkmark{
        div{
          width: 12px;
          height: 12px;
        }
      }
    }
  }

  
  

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 12px;
    *:last-child{
      font-size: 12px;
      margin-top: 4px
    }
  }
`