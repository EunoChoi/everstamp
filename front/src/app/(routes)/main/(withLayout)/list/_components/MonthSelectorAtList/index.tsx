import { getYear } from "date-fns";
import { useState } from "react";
import styled from "styled-components";


import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RefreshIcon from '@mui/icons-material/Refresh';


interface Props {
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  monthSelectorOpen: boolean;
  selectedMonth: number;
  setMonthSelectorOpen: (d: boolean) => void;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: (d: number) => void;
}

const MonthSelector = ({
  monthSelectorOpen,
  setMonthSelectorOpen,
  setSelectedYear,
  setSelectedMonth
}: Props) => {

  // const scrollTimeoutRef = useRef<number | null>(null);

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
  const onSubmit = () => {
    setSelectedMonth(tempMonth);
    setSelectedYear(tempYear);
  }

  return (
    <BG className={monthSelectorOpen ? 'open' : ''} onClick={() => setMonthSelectorOpen(false)} >
      <Wrapper
        onClick={(e) => e.stopPropagation()}
        className={monthSelectorOpen ? 'open' : ''}>
        <YearArea>
          <div className="left">
          </div>
          <div className="center">
            <button className="arrow" onClick={goToPreYear}><ArrowBackIosNewIcon fontSize="small" /></button>
            <span onClick={goToCurrentDate}>{tempYear}</span>
            <button className="arrow" onClick={goToNextYear}><ArrowForwardIosIcon fontSize="small" /></button>
          </div>
          <div className="right">
            <button onClick={calcelSelectMonth}><RefreshIcon fontSize="small" /></button>
          </div>
        </YearArea>
        <MonthsArea>
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
        </MonthsArea>
        <ButtonArea>
          <button onClick={() => {
            onSubmit();
            setMonthSelectorOpen(false);
          }}>
            확인
          </button>
        </ButtonArea>
      </Wrapper>
    </BG>
  );
}

export default MonthSelector;

const BG = styled.div`
  position: fixed; 
  left: 0px;
  

  width: 100dvw;
  height: 100dvh;
  backdrop-filter: blur(4px);

  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;
  &.open{
    opacity: 1;
    visibility: visible;
  }

  @media (max-width: 479px) { //mobile port
    top: var(--mobileHeader);
    z-index: 98;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    top: 0px;
    z-index: 105;
  }
  @media (min-width:1024px) { //desktop
    top: 0px;
    z-index: 105;
  }
`

const Wrapper = styled.div`
  overflow: hidden;
  position: fixed;
  top: var(--mobileHeader);
  top: 0;

  flex-shrink: 0;
  
  padding: 0 24px;

  background-color: white;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.025) 1px, transparent 1px);
  background-size: 10px 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  @media (max-width: 479px) { //mobile port
    box-shadow: 0px 12px 12px rgba(0,0,0,0.1);
    width: 100%;
    /* height: 0px; */
    height: 400px;

    will-change: height;
    transform: scaleY(0);
    transform-origin: top;

    border-end-start-radius: 24px;
    border-end-end-radius: 24px;

    transition: transform 0.3s ease-in-out;
    
    &.open{
      transform: scaleY(1);
      /* height: 400px; */
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    box-shadow: 0px 4px 24px rgba(0,0,0,0.15);
    z-index: 999;
    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);

    width: 450px;
    height: 370px;
    border-radius: 24px;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s linear, visibility 0.3s linear;

    &.open{
      opacity: 1;
      visibility: visible;
    }
  }
  @media (min-width:1024px) { //desktop
    box-shadow: 0px 4px 24px rgba(0,0,0,0.15);

    top: 50dvh;
    left: 50dvw;
    transform: translate(-50%, -50%);

    height: 400px;
    width: 500px;
    border-radius: 24px;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s linear, visibility 0.3s linear;

    &.open{
      opacity: 1;
      visibility: visible;
    }
  }
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
  height: 200px;

  margin : 32px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 100%;

  button{
    font-size: 14px;
    font-weight: 600;


    padding: 4px 24px;
    border-radius: 32px;
    border: 2px solid rgba(0,0,0,0.08);

    background-color:  ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    filter: brightness(130%) saturate(50%);
    color: rgb(var(--greyTitle));
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
    background-color:  ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    filter: brightness(130%) saturate(50%);
    border-radius: 12px;
  }
`
const Section = styled.section`
  width: 100%;
  height: 50%;
  /* flex-grow: 1; */
  display: flex;
  justify-content: space-between;
`


