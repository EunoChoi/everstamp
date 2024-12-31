import styled from "styled-components";
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import { RefObject } from "react";

interface Props {
  habitName: string;
  setHabitName: (name: string) => void;
  priority: number;
  setPriority: (n: number) => void;
}


const NStart = (n: number) => {
  return (
    <>
      {Array(n).fill(0).map((_, i) => (
        <StarPurple500OutlinedIcon key={'star' + i} fontSize="inherit" />
      ))}
    </>
  );
}

const HabitInputValues = ({ habitName, setHabitName, priority, setPriority }: Props) => {


  return (
    <Wrapper>
      <Value>
        <span>목표 습관 이름</span>
        <input
          onChange={(e) => setHabitName(e.currentTarget.value)}
          value={habitName || ""} />
      </Value>
      <Value>
        <span>중요도</span>
        <RadioWrapper>
          {[...Array(3)].map((_, i: number) =>
            <RadioButton key={'radio' + i}>
              <input type="radio" checked={i === priority} name="priority" value={i} onChange={(e) => {
                if (e.currentTarget.checked) setPriority(Number(e.currentTarget.value));
              }} />
              <div className="checkmark">
                {NStart(i + 1)}
              </div>
            </RadioButton>)}
        </RadioWrapper>
      </Value>
    </Wrapper>
  );
}

export default HabitInputValues;

const Wrapper = styled.div`
  width: 100%;
`

const RadioWrapper = styled.div`
  width: 100%;
  margin : 8px 0;
  height: 38px;
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
    background-color: ${(props) => props.theme.point ? props.theme.point + 'a0' : '#979FC7'};
  }
`;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin : 24px 10%;
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
    height: 38px;
    margin: 8px 0;
    padding: 4px 8px;
    flex-grow: 1;
    font-weight: 500;


    border : 2px solid rgba(0,0,0,0.1);
    border-radius: 8px;
  }
`