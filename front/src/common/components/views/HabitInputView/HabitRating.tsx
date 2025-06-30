import styled from "styled-components";
import { StarRating } from '../../ui/StarRating';

interface Props {
  priority: number;
  setPriority: (n: number) => void;
}

export const HabitRating = ({ priority, setPriority }: Props) => {
  return (
    <Wrapper>
      <span>중요도</span>
      <RadioWrapper>
        {[...Array(3)].map((_, i: number) =>
          <RadioButton key={'radio' + i}>
            <input type="radio" checked={i === priority} name="priority" value={i} onChange={(e) => {
              if (e.currentTarget.checked) setPriority(Number(e.currentTarget.value));
            }} />
            <div className="checkmark">
              <StarRating rating={i + 1} />
            </div>
          </RadioButton>)}
      </RadioWrapper>
    </Wrapper>
  );
}

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
    background-color: ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  >div{
    width: 100%;
    display:flex;
    justify-content: space-evenly;
    align-items: center;
  }
  span{
    text-transform: capitalize;
    font-size: 18px;
    color: rgba(var(--greyTitle), 0.8);
  }
  input{
    font-size: 16px;
    width: 100%;
    height: 38px;
    margin: 8px 0;
    padding: 4px 8px;
    flex-grow: 1;

    border : 2px solid rgba(0,0,0,0.1);
    border-radius: 8px;
  }
`