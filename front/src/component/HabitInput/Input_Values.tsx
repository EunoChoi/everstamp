import styled from "styled-components";

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { RefObject } from "react";
import Axios from "@/Aixos/aixos";

interface Props {
  habitName: string;
  setHabitName: (name: string) => void;
}

const HabitInputValues = ({ habitName, setHabitName }: Props) => {
  return (
    <>
      <Value>
        <span>name</span>
        <input
          onChange={(e) => setHabitName(e.currentTarget.value)}
          value={habitName} />
      </Value>
      <Value>
        <span>color</span>
        <div className="colors">
          <button className="color selected"></button>
          <button className="color"></button>
          <button className="color"></button>
          <button className="color"></button>
          <button className="color"></button>
        </div>
      </Value>
    </>
  );
}

export default HabitInputValues;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin : 0 10%;
  @media (min-height:480px) and (min-width:1024px) { //desktop
    margin : 0 20%;
  }

  span{
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 500;
    color: rgba(var(--greyTitle), 0.8);
  }
  input{
    font-size: 16px;
    width: 100%;
    margin: 8px 0;
    padding: 2px 16px;
    flex-grow: 1;
    font-weight: 500;


    border : 2px solid rgba(0,0,0,0.1);
    /* background-color: whitesmoke; */

    border-radius: 8px;
  }
  .colors{
    display: flex;
    justify-content: start;
    align-items: center;

    width: 100%;
    margin: 8px 0;
    overflow-x: scroll;
  }
  .color{
    height: 44px;
    aspect-ratio: 1;
    margin-right: 8px;
    border : 2px solid rgba(0,0,0,0.1);
    border-radius: 8px;

    &.selected{
      border : 2px solid rgba(0,0,0,0.2);
    }
  }
`