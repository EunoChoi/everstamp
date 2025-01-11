import styled from "styled-components";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
    setSelectedMonth(0);
  }
  const goToPreYear = () => {
    setSelectedYear(c => c - 1);
    setSelectedMonth(0);
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
  return (<Wrapper>
    <YearArea>
      <button className="arrow" onClick={goToPreYear}><ArrowBackIosNewIcon fontSize="small" /></button>
      <span onClick={goToCurrentDate}>{selectedYear}</span>
      <button className="arrow" onClick={goToNextYear}><ArrowForwardIosIcon fontSize="small" /></button>
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
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;

  span{
    font-size: 20px;
    font-weight: 600;
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
  .arrow{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 6px;
  }
`
const MonthsArea = styled.div`
  width: 100%;
  height: 150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
   height: 120px;
  }
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


