import { format } from "date-fns";


//icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styled from "styled-components";
import { useCalendar } from "./CalendarContext";

interface CalendarHeaderProps {
  headerSize: 'small' | 'middle' | 'large';
  headerTitlePosition: 'center' | 'start';
}

const WEEK_TITLE_ENG = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const CalendarHeader = ({
  headerSize,
  headerTitlePosition,
}: CalendarHeaderProps) => {

  const {
    displayDate,
    prevMonth,
    nextMonth,
    goToday,
  } = useCalendar();

  return (
    <>
      {headerTitlePosition === 'center' &&
        <CalTitle className={`${headerSize} ${headerTitlePosition}`} >
          <button onClick={prevMonth}><KeyboardArrowLeftIcon fontSize="small" /></button>
          <button onClick={goToday}>
            {format(displayDate, 'MMMM. yyyy')}
          </button>
          <button onClick={nextMonth}><KeyboardArrowRightIcon fontSize="small" /></button>
        </CalTitle>
      }
      {headerTitlePosition === 'start' &&
        <CalTitle className={`${headerSize} ${headerTitlePosition}`}>
          <CalTitleText
            className={headerSize}
            onClick={goToday}>
            {format(displayDate, 'MMMM. yyyy')}
          </CalTitleText>
          <ArrowButtonWrapper>
            <button className={headerSize} onClick={prevMonth}><KeyboardArrowLeftIcon fontSize="small" color='inherit' /></button>
            <button className={headerSize} onClick={nextMonth}><KeyboardArrowRightIcon fontSize="small" color='inherit' /></button>
          </ArrowButtonWrapper>
        </CalTitle>}
      <CalWeeks>
        {WEEK_TITLE_ENG.map(e => <span key={e}>{e}</span>)}
      </CalWeeks>
    </>);
}

export default CalendarHeader;

const CalTitle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.small{ padding: 6px 0; }
  &.middle{ padding: 12px 0; }
  &.large{ padding: 18px 0; }
`
const CalWeeks = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-transform: capitalize;
  padding: 6px 0;
  font-size: 16px;
  color: rgb(var(--greyTitle));

  span{
    width: 100%;
    text-align: center;
  }
`
const CalTitleText = styled.button`
  text-transform: capitalize;
  color: rgb(var(--greyTitle));
  font-family: 'BMJUA';
  
  &.small{   font-size: 20px;}
  &.middle{   font-size: 26px;}
  &.large{    font-size: 32px;}
`
const ArrowButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  button{
    color: grey;
    display: flex;

    &.small{   padding: 3px; }
    &.middle{    padding: 4px;  }
    &.large{      padding: 6px; }
  }
`