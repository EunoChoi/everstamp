import styled from "styled-components";

const HabitInfoChart = () => {
  return (
    <Chart>
      <span className="title">Monthly habit achievement count</span>
      <div className="chartArea">
        {[...Array(12)].map((_, i: number) =>
          <BarWrapper className="barWrapper" key={'month' + i + 1} $count={(i) / 18 * 100}>
            <div className="barEmpty">{i}</div>
            <div className="bar"></div>
            <div className="month">{i + 1}</div>
          </BarWrapper>)}
      </div>
      <span className="bottom">Month</span>
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
    font-weight: 500;
    color: grey;
  }
  .chartArea{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
`