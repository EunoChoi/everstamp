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
      {fourDate.map(e => {
        return <Check key={e}>
          <span>{format(e, 'EEE')}</span>
          <span>{format(e, 'd')}</span>

          <button>
            {/* <RadioButtonCheckedIcon fontSize="inherit" /> */}
            <RadioButtonUncheckedIcon fontSize="inherit" />
          </button>
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

  color: rgba(var(--greyTitle),0.6);
`
const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;

  /* position: relative; */
  
  border-radius: 16px;
  background-color: whitesmoke;
  border: 1px solid rgba(0,0,0,0.05);

  display: flex;
  flex-direction: column;
`
const Name = styled.span`
  width: 100%;
  height: 30%;
  /* position: absolute;
  top: 0; */

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
  /* position: absolute;
  bottom: 0; */
  font-size: 16px;
  

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Check = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  height: 100%;

  font-size: 14px;
  font-weight: 500;
  color: grey;

  &:first-child{
    font-weight: 600;
    color: rgb(var(--greyTitle));
  }
  *:last-child{
    margin-top: 8px;
    font-size: 18px;
    color: rgb(var(--point));
  }

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 10px;
    *:last-child{
      font-size: 10px;
      margin-top: 4px
    }
  }
`