import styled from "styled-components";

interface Props {
  habitName: string;
  setHabitName: (name: string) => void;
}

export const HabitName = ({ habitName, setHabitName }: Props) => {
  return (
    <Wrapper>
      <span>목표 습관 이름</span>
      <input
        onChange={(e) => setHabitName(e.currentTarget.value)}
        value={habitName || ""} />
    </Wrapper>
  );
}
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
    height: 40px;
    margin: 8px 0;
    padding: 4px 12px;
    flex-grow: 1;

    border-radius: 14px;
    background-color: rgba(255,255,255,0.8);
    box-shadow: inset 0 1px 4px rgba(0,0,0,0.04);
  }
`