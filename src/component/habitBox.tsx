'use client';

import styled from "styled-components";
import { useRef } from "react";

//icon
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';



const HabitBox = () => {
  const boxRef = useRef<null | HTMLDivElement>(null);
  console.log(boxRef.current);
  return (<Wrapper ref={boxRef}>
    <Name>habit name</Name>
    <Days>
      {[1, 2, 3, 4].map(e => {
        return <Check key={e}>
          <span>T</span>
          <span>26</span>
          <RadioButtonCheckedIcon />
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

  /* aspect-ratio: 1/1; */

  border-radius: 16px;
  background-color: rgb(var(--lightGrey_CP));

  display: flex;
  flex-direction: column;
`
const Name = styled.span`
  width: 100%;
  height: 30%;
  position: absolute;
  top: 0;

  font-size: 24px;
  font-weight: 600;
  color: rgb(var(--grey_Title));

  text-transform: capitalize;
  text-align: center;
  display: flex;
  align-items: end;
  justify-content: center;
`
const Days = styled.div`
  width: 100%;
  height: 70%;
  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Check = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: 600;
    *:last-child{
      margin-top: 16px;
      color: rgb(var(--point));
    }
`