import styled from "styled-components";
import { getMonth, getYear } from "date-fns";
import { useState } from "react";


import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RefreshIcon from '@mui/icons-material/Refresh';


interface Props {
  open: boolean;
  selectedMonth: number;
  setMonthSelectorOpen: (d: boolean) => void;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
}

const MonthSelector = ({
  open,
  selectedMonth,
  setMonthSelectorOpen,
  setSelectedYear,
  setSelectedMonth
}: Props) => {

  const [tempYear, setTempYear] = useState<number>(getYear(new Date()));
  const [tempMonth, setTempMonth] = useState<number>(0);

  const monthsTopNum = [1, 2, 3, 4, 5, 6];
  const monthsTopEng = ['jan', 'feb', 'mar', 'apr', 'may', 'jun'];
  const monthsBottomNum = [7, 8, 9, 10, 11, 12];
  const monthsBottomEng = ['jul', 'aug', 'sep', 'oct', 'nov', 'dec'];


  const goToNextYear = () => {
    setTempYear(c => c + 1);
  }
  const goToPreYear = () => {
    setTempYear(c => c - 1);
  }
  const goToCurrentDate = () => {
    setTempYear(getYear(new Date()));
  };
  const calcelSelectMonth = () => {
    setTempYear(getYear(new Date()));
    setTempMonth(0)
  }
  const submit = () => {
    setSelectedMonth(tempMonth);
    setSelectedYear(tempYear);
  }

  return (<Wrapper className={open ? 'open' : ''}>
    <Year>
      <div className="left">

      </div>
      <div className="center">
        <button onClick={goToPreYear}><ArrowBackIosNewIcon fontSize="small" /></button>
        <span onClick={goToCurrentDate}>{tempYear}</span>
        <button onClick={goToNextYear}><ArrowForwardIosIcon fontSize="small" /></button>
      </div>
      <div className="right">
        <button onClick={calcelSelectMonth}><RefreshIcon fontSize="small" /></button>
      </div>
    </Year>
    <Months>
      <Section>{monthsTopNum.map((e, i) =>
        <Month
          className={tempMonth === i + 1 ? 'selectedMonth' : ''}
          key={'month' + i + 1}
          onClick={() => setTempMonth(i + 1)}>
          <span className="num">{e}</span>
          <span className="eng">{monthsTopEng[i]}</span>
        </Month>)}
      </Section>
      <Section>{monthsBottomNum.map((e, i) =>
        <Month
          className={tempMonth === i + 7 ? 'selectedMonth' : ''}
          key={'month' + i + 6}
          onClick={() => setTempMonth(i + 7)}>
          <span className="num">{e}</span>
          <span className="eng">{monthsBottomEng[i]}</span>
        </Month>)}
      </Section>
      <div>
        <Button onClick={() => {
          submit();
          setMonthSelectorOpen(false);
        }}>확인</Button>
      </div>
    </Months>
  </Wrapper>);
}

export default MonthSelector;

const Button = styled.button`
  font-size: 14px;
  margin-top: 24px;
  margin-left: 4px;
  margin-right: 4px;

  padding: 4px 16px;
  width: 80px;
  border-radius: 32px;
  border: 2px solid rgba(0,0,0,0.08);

  background-color:  ${(props) => props.theme.point ? props.theme.point + '45' : '#979FC7'};
`
const Month = styled.button`
  width : 16%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.selectedMonth{
    background-color:  ${(props) => props.theme.point ? props.theme.point + '45' : '#979FC7'};
    border-radius: 12px;
  }
`

const Section = styled.section`
  width: 100%;
  height: 50%;
  /* flex-grow: 1; */
  display: flex;
  justify-content: space-between;

  .num{
    font-size: 16px;
    font-weight: 600;
    color: rgb(var(--greyTitle));
  }
  .eng{
    font-size: 14px;
    text-transform: capitalize;
    color: grey;
  }
`

const Wrapper = styled.div`
  position: fixed;
  top: var(--mobileHeader);

  flex-shrink: 0;
  transition: ease-in-out 0.3s all;


  @media (max-width: 479px) { //mobile port
    width: 100%;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 75dvw;
  }
  @media (min-width:1024px) { //desktop
    width: calc(100vw - var(--sidebarWidth));
  }
  height: 0;
  padding: 0 24px;
  border-bottom: none;
  opacity: 0;
  
  &.open{
    opacity: 1;
    height: 270px;
    padding: 18px;
    padding-bottom: 24px;
    background-color: white;
    box-shadow: 0px 3px 48px rgba(0,0,0,0.25);
    @media (max-width: 479px) { //mobile port
      padding-top: 32px;
      padding-bottom: 32px;
      height: 370px;
    }
    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      height: 350px;
    }
    @media (min-width:1024px) { //desktop
      padding: 36px;
      height: 400px;
    }
  }
  


  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  border-end-start-radius: 24px;
  border-end-end-radius: 24px;
`
const Year = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 0;

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
  }

  span{
    font-size: 20px;
    font-weight: 600;
    margin: 0 36px;
    line-height: 0;
  }
`
const Months = styled.div`
  width: 100%;

  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`