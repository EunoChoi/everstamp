import styled from "styled-components";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RefreshIcon from '@mui/icons-material/Refresh';

import { getYear } from "date-fns";

interface Props {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
}

const MonthSelector = ({ selectedYear, setSelectedYear, selectedMonth, setSelectedMonth }: Props) => {

  const monthsTopNum = [1, 2, 3, 4, 5, 6];
  const monthsTopEng = ['jan', 'feb', 'mar', 'apr', 'may', 'jun'];
  const monthsBottomNum = [7, 8, 9, 10, 11, 12];
  const monthsBottomEng = ['jul', 'aug', 'sep', 'oct', 'nov', 'dec'];


  const goToNextYear = () => {
    setSelectedYear(c => c + 1);
  }
  const goToPreYear = () => {
    setSelectedYear(c => c - 1);
  }
  const goToCurrentDate = () => {
    setSelectedYear(getYear(new Date()));
  };
  const selectMonth = (n: number) => {
    if (selectedMonth === n) {
      setSelectedMonth(0)
    }
    else setSelectedMonth(n)
  }
  const calcelSelectMonth = () => {
    setSelectedYear(getYear(new Date()));
    setSelectedMonth(0)
  }

  return (<Wrapper>
    <YearArea>
      <div className="left">
      </div>
      <div className="center">
        <button className="arrow" onClick={goToPreYear}><ArrowBackIosNewIcon fontSize="small" /></button>
        <span onClick={goToCurrentDate}>{selectedYear}</span>
        <button className="arrow" onClick={goToNextYear}><ArrowForwardIosIcon fontSize="small" /></button>
      </div>
      <div className="right">
        <button onClick={calcelSelectMonth}><RefreshIcon fontSize="small" /></button>
      </div>
    </YearArea>
    <MonthsArea>
      <Section>{monthsTopNum.map((e, i) =>
        <Month
          className={selectedMonth === i + 1 ? 'selectedMonth' : ''}
          key={'month' + i + 1}
          onClick={() => selectMonth(i + 1)}>
          <span className="num">{e}</span>
          <span className="eng">{monthsTopEng[i]}</span>
        </Month>)}
      </Section>
      <Section>{monthsBottomNum.map((e, i) =>
        <Month
          className={selectedMonth === i + 7 ? 'selectedMonth' : ''}
          key={'month' + i + 6}
          onClick={() => selectMonth(i + 7)}>
          <span className="num">{e}</span>
          <span className="eng">{monthsBottomEng[i]}</span>
        </Month>)}
      </Section>
    </MonthsArea>
  </Wrapper>);
}

export default MonthSelector;


const Wrapper = styled.div`
`
const YearArea = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  span{
    font-size: 20px;
    font-weight: 600;
    margin: 0 36px;
    line-height: 0;
  }
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
  .left, .right{
    width: 16%;
  }
  .right{
    display: flex;
    justify-content: end;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  .arrow{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
`
const MonthsArea = styled.div`
  width: 100%;
  height: 170px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Month = styled.button`
  width : 16%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .num{
    font-size: 16px;
    font-weight: 600;
    color: rgb(var(--greyTitle));
  }
  .eng{
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 300;
    color: rgb(var(--greyTitle));
  }

  &.selectedMonth{
    background-color: ${(props) => props.theme.point ? props.theme.point + '90' : '#979FC7'};
    border: 2px solid rgba(0,0,0,0.07);
    border-radius: 12px;
  }
`
const Section = styled.section`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
`


