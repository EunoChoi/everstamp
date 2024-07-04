import styled from "styled-components";
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import { RefObject } from "react";

interface Props {
  habitName: string;
  setHabitName: (name: string) => void;
  priority: number;
  setPriority: (n: number) => void;
  inputRef: RefObject<HTMLInputElement>;
}


const HabitInputValues = ({ habitName, setHabitName, priority, setPriority, inputRef }: Props) => {


  return (
    <>
      <Value>
        <span>name</span>
        <input
          ref={inputRef}
          onChange={(e) => setHabitName(e.currentTarget.value)}
          value={habitName || ""} />
      </Value>
      <Value>
        <span>priority</span>
        <RadioWrapper>
          {[...Array(3)].map((_, i: number) =>
            <RadioButton key={'radio' + i}>
              <input type="radio" checked={i === priority} name="priority" value={i} onChange={(e) => {
                if (e.currentTarget.checked) setPriority(Number(e.currentTarget.value));
              }} />
              <div className="checkmark">
                {[...Array(i + 1)].map((_, j: number) => <StarPurple500OutlinedIcon key={i + j} fontSize="inherit" />)}
              </div>
            </RadioButton>)}
        </RadioWrapper>
      </Value>
    </>
  );
}

export default HabitInputValues;

const RadioWrapper = styled.div`
  width: 100%;
  margin : 8px 0;
  height: 28px;
  border : 2px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
`
const RadioButton = styled.label`
  position: relative;
  width: 100%;
  height: 100%;
  border-right : 2px solid rgba(0,0,0,0.1);
  &:last-child{
    border: none;
  }
  input{
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }
  .checkmark{
    box-sizing: border-box;
    cursor: pointer;

    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    color: rgb(var(--greyTitle));
    font-size: 14px;
  }
  input:checked ~ .checkmark{
    background-color: ${(props) => props.theme.point ? props.theme.point + 'a0' : '#9797CB'};
  }
`;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin : 6px 10%;
  @media (min-height:480px) and (min-width:1024px) { //desktop
    margin : 0 20%;
  }
  >div{
    width: 100%;
    display:flex;
    justify-content: space-evenly;
    align-items: center;
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
    padding: 2px 8px;
    flex-grow: 1;
    font-weight: 500;


    border : 2px solid rgba(0,0,0,0.1);
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