import styled from "styled-components";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getHabit_single_status_month } from "@/common/function/fetch/habit";
import { useSearchParams } from "next/navigation";

const HabitInfoPageValue = ({ displayDate, dateData }: { displayDate: Date, dateData: Date }) => {
  const params = useSearchParams();
  const habitId = params.get('id');

  const { data } = useQuery({
    queryKey: ['habit', 'id', habitId, 'month', format(displayDate, 'MM')],
    queryFn: () => getHabit_single_status_month({ id: habitId, date: displayDate }),
    select: (data) => {
      const monthSingleHabitResult: { [key: string]: boolean } = {};
      data?.forEach((e: any) => {
        monthSingleHabitResult[format(e.date, 'yyMMdd')] = e?.Habits && true;
      });
      return { ...data, monthSingleHabitResult }
    }
  });

  const key = format(dateData, 'yyMMdd');
  const formattedDate = format(dateData, 'd');
  const isDone = data?.monthSingleHabitResult[key];

  return <Wrapper>
    <DateValue className={isDone && 'done'}>
      {formattedDate}
    </DateValue>
  </Wrapper>;
};

export default HabitInfoPageValue;

const Wrapper = styled.button`
  @keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }
  animation: fadeIn 300ms ease-in-out;
  transition: border 400ms ease-in-out;

  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const DateValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  color: #525252;

  width: 28px;
  height: 28px;
  border-radius: 28px;
  &.done{
    background-color: ${(props) => props.theme.point ? props.theme.point + 'c0' : '#979FC7'};
    color: white;
  }
`