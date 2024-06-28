import styled from "styled-components";

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useState } from "react";
import { subYears, addYears, format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getHabit_single_status_year } from "@/app/(afterLogin)/_lib/habit";

const HabitInfoChart = () => {
  const params = useSearchParams(); //for habit id
  const habitId = params.get('id');

  const [current, setCurrent] = useState<Date>(new Date());

  const { data } = useQuery({
    queryKey: ['habit', 'id', habitId, 'year', format(current, 'yyyy')],
    queryFn: () => getHabit_single_status_year({ id: habitId, date: current }),
  });

  const currentYear = () => {
    setCurrent(new Date());
  };
  const nextYear = () => {
    const temp = addYears(current, 1);
    setCurrent(temp);
  };
  const preYear = () => {
    const temp = subYears(current, 1);
    setCurrent(temp);
  };


  return (
    <Chart>
      <span className="title">Monthly habit achievement count</span>
      <div className="chartArea">
        {[...Array(12)].map((_, i: number) =>
          <BarWrapper className="barWrapper" key={'month' + i + 1} $count={data && data[i] / 18 * 100}>
            <div className="barEmpty">{data && data[i] > 0 && data[i]}</div>
            <div className="bar"></div>
            <div className="month">{i + 1}</div>
          </BarWrapper>)}
      </div>
      <div className="bottom">
        <button onClick={preYear}><ArrowBackIosNewOutlinedIcon fontSize="small" /></button>
        <button onClick={currentYear}>{format(current, 'yyyy')}</button>
        <button onClick={nextYear}><ArrowForwardIosOutlinedIcon fontSize="small" /></button>
      </div>
    </Chart>);
}

export default HabitInfoChart;

const BarWrapper = styled.div<{ $count: number }>`
  width: 100%;
  height: 100%;
  margin: 0 4px;

  display: flex;
  flex-direction: column;
  text-align: center;
  .barEmpty{
    flex-grow: 1;
    display : flex;
    flex-direction: column;
    justify-content: end;
  }
  .bar{
    height: ${(props) => props.$count + '%'};
    border-radius: 8px;
    background-color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};  
  }
  .month{
    font-weight: 500;
  }
`
const Chart = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: rgb(var(--greyTitle));
  >span{
    padding: 8px 0;
  }
  .title, .bottom{
    font-size: 18px;
    font-weight: 500;
    color: grey;
  }
  .bottom{
    margin: 8px 0;
    display: flex;
    align-items: center;
    
    button{
      line-height: 0;
      margin : 0 4px;
    }
  }
  .chartArea{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
`