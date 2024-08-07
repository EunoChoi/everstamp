import { useRouter } from "next/navigation";
import styled from "styled-components";

interface Props {
  habits: Array<HabitProps>;
}
interface HabitProps {
  UserId: number;
  id: number;
  email: string;
  name: string;
  // themeColor: string;
  priority: number;
}

const DiaryHabits = ({ habits }: Props) => {
  const router = useRouter();

  return (
    <Habits className="habits">
      <Habit>{habits?.length ? habits?.length : 0} habits</Habit>
      {habits?.map((habit: HabitProps, i: number) =>
        <Habit
          className={`${habit.priority ? 'priority' + habit.priority : ''}`}
          onClick={() => router.push(`/app/inter/habitInfo?id=${habit.id}`, { scroll: false })}
          key={habit.name + i}>
          {habit.name}
        </Habit>)}
    </Habits>
  );
}

export default DiaryHabits;


const Habits = styled.div`
  width: 100%;
  height: auto;
  padding : 10px 0;
  /* margin: 8px 0; */

  @media (max-width: 479px) { //mobile port
    padding-left : 5dvw;
    padding-right: 5dvw;
  }
  
  @media (min-width:1024px) { //desktop
    padding : 14px 0;
  }
  
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


  background-color: ${(props) => props.theme.point ? props.theme.point + '40' : '#979FC7'};
  &.priority1{
    background-color: ${(props) => props.theme.point ? props.theme.point + '65' : '#979FC7'};
  }
  &.priority2{
    background-color : ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};
  }

  border-radius: 24px;
  margin-right: 12px;

  white-space: nowrap;
  text-transform: capitalize;

  font-size: 16px;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;


  box-sizing: border-box;

  &:first-child{
    background-color: rgba(0,0,0,0);
    border : solid 4px ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};
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