'use client';

import styled from "styled-components";


//icon
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import { subDays, format } from "date-fns";

const HabitBox = () => {

  const currentDate = new Date();
  let fourDate = new Array(4).fill(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
  fourDate = fourDate.map((e, i) => subDays(e, i));

  return (<Wrapper>
    <Name>habit name</Name>
    <Days>
      {fourDate.map(e => {
        return <Check key={e}>
          <span>{format(e, 'EEE')}</span>
          <span>{format(e, 'd')}</span>

          <button>
            {/* <RadioButtonCheckedIcon /> */}
            <RadioButtonUncheckedIcon />
          </button>
        </Check>
      })}
    </Days>
  </Wrapper>);
}

export default HabitBox;
const Wrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  
  border-radius: 16px;
  background-color: whitesmoke;
  border: 1px solid rgba(0,0,0,0.05);

  display: flex;
  flex-direction: column;
`
const Name = styled.span`
  width: 100%;
  height: 30%;
  position: absolute;
  top: 0;

  font-size: 22px;
  font-weight: 600;
  color: rgb(var(--greyTitle));

  text-transform: capitalize;
  text-align: center;
  display: flex;
  align-items: end;
  justify-content: center;

  @media screen and (max-width: 720px) {
    font-size: 18px;
  }
`
const Days = styled.div`
  width: 100%;
  height: 70%;
  position: absolute;
  bottom: 0;
  font-size: 16px;
  

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 720px) {
    font-size: 12px;
  }
`
const Check = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: 500;
    color: grey;
    &:first-child{
      font-weight: 600;
      color: rgb(var(--greyTitle));
    }
    *:last-child{
      margin-top: 8px;
      color: rgb(var(--point));
    }
`