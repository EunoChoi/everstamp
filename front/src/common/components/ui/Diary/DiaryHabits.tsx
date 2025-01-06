import useCustomRouter from "@/common/hooks/useCustomRouter";
import styled from "styled-components";

interface Props {
  habits: Array<HabitProps>;
}
interface HabitProps {
  UserId: number;
  id: number;
  email: string;
  name: string;
  priority: number;
}

const DiaryHabits = ({ habits }: Props) => {
  const router = useCustomRouter();

  return (
    <Habits>
      <Habit>
        <span> {habits?.length ? habits?.length : 0} habits</span>
      </Habit>
      {habits?.map((habit: HabitProps, i: number) =>
        <Habit
          className={`${habit.priority ? 'priority' + habit.priority : ''}`}
          onClick={() => router.push(`/app/inter/habitInfo?id=${habit.id}`, { scroll: false })}
          key={habit.name + i}>
          <span>{habit.name}</span>
        </Habit>)}
    </Habits>
  );
}

export default DiaryHabits;


const Habits = styled.div`
  &::-webkit-scrollbar{
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  width: 100%;
  height: auto;
  padding : 12px 14px;
  
  display: flex;
  flex-shrink: 0;
  justify-content: start;
  gap: 8px;

  overflow-x : scroll;
  flex-wrap: nowrap;
`
const Habit = styled.span`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;

  padding : 2px 12px;
  border-radius: 24px;
  line-height: 1.4;
  white-space: nowrap;
  
  background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  border: 2px solid rgba(0,0,0,0.07);
  filter: brightness(130%) saturate(50%);



  span{
    font-size: 14px;
    font-weight: 500;
    color: rgba(0,0,0,0.6);
    
    text-transform: capitalize;
  }
  &:first-child{
    border: 2px solid ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    background-color: white;
    span{
      font-weight: 600;
    }
  }
`