import styled from "styled-components";

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useState } from "react";
import { subYears, addYears, format, isLeapYear } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getHabit_single_status_year } from "@/common/fetchers/habit";

const HabitInfoChart = () => {
  const params = useSearchParams(); //for habit id
  const habitId = params.get('id');

  const [current, setCurrent] = useState<Date>(new Date());

  const { data } = useQuery({
    queryKey: ['habit', 'id', habitId, 'year', format(current, 'yyyy')],
    queryFn: () => getHabit_single_status_year({ id: habitId, date: current }),
  });

  const year = format(current, 'yyyy');
  const count = data?.reduce((acc: number, cur: number) => (acc + cur), 0);


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
      <Info>
        <div className="text">
          <span>{year}년 연간</span>
          <span>실천 횟수</span>
        </div>
        <div className="count">
          {count} / {isLeapYear(year) ? 366 : 365}
        </div>
      </Info>
      <span className="title">{year}년 월별 실천 횟수 그래프</span>
      <div className="chartArea">
        {[...Array(12)].map((_, i: number) =>
          <BarWrapper className="barWrapper" key={'month' + i + 1} $count={data && data[i] / 31 * 100}>
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

const Info = styled.div`
  width: 100%;
  padding: 32px 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .text{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: start;

    span{
      color: rgb(var(--greyTitle));
      font-weight: 500;
      line-height: 150%;
      font-size: 18px;
    }
  }
  .count{
        line-height: 100%;
    font-weight: 700;
    font-size: 42px;
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
  }
`

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
    padding-bottom: 8px;
  }
  .bar{
    height: ${(props) => props.$count + '%'};
    border-radius: 8px;
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};  
  }
  .month{
    font-weight: 500;
    padding: 8px 0;
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
    line-height: 100%;
    font-size: 18px;
    font-weight: 500;
    color: grey;
  }
  .subTitle{
    text-align: center;
    line-height: 100%;
    font-size: 16px;
    font-weight: 500;
    color: darkgrey;
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