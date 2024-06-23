import styled from "styled-components";

interface Props {
  habits: Array<Habit>;
}
interface Habit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  themeColor: string;
}

const DiaryHabits = ({ habits }: Props) => {
  console.log(habits);
  return (
    <Habits className="habits">
      <Habit>{habits?.length ? habits?.length : 0} habits</Habit>
      {habits?.map((habit: Habit, i: number) => <Habit key={habit.name + i}>{habit.name}</Habit>)}
    </Habits>
  );
}

export default DiaryHabits;


const Habits = styled.div`
  width: 100%;
  height: auto;
  padding : 8px 0;
  margin: 8px 0;
  
  display: flex;
  justify-content: start;
  overflow-x : scroll;
  flex-shrink: 0;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }
`
const Habit = styled.span`
  cursor: pointer;
  flex-shrink: 0;
  
  padding : 0px 16px;
  color: rgb(var(--greyTitle));
  background-color: rgb(var(--point2));
  border-radius: 24px;
  margin-right: 12px;

  white-space: nowrap;
  text-transform: capitalize;

  font-size: 16px;
  font-weight: 500;

  box-sizing: border-box;
  border : solid 4px rgb(var(--point2));

  &:first-child{
    background-color: rgba(0,0,0,0);
  }
  &:last-child{
    margin-right: 0px;
  }
  @media (max-width: 479px) { //mobile port
    padding : 0px 12px;
    font-size: 13px;
    margin-right: 8px;
  }
`