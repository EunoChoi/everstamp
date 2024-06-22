import styled from "styled-components";

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { RefObject } from "react";
import Axios from "@/Aixos/aixos";

interface Props {
  type?: string;
  onSubmit: () => void;
}

const HabitInputButtons = ({ type, onSubmit }: Props) => {


  return (
    <Buttons>
      <Button onClick={() => onSubmit()}>
        {type === 'edit' ? <ModeEditOutlineOutlinedIcon /> : <AddTaskOutlinedIcon className="icon" />}
      </Button>
    </Buttons>
  );
}

export default HabitInputButtons;


const Buttons = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: var(--mobileNav);
  /* flex-shrink: 0; */
  background-color: whitesmoke;
  border-top: solid 1px rgba(0,0,0,0.1);

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`
const Button = styled.button`
  .icon{
    color: rgba(0,0,0,0.3) !important;
  }
  .icon:hover{
    color: rgb(var(--point)) !important;
  }
`