import { format } from "date-fns";


//icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styled from "styled-components";

interface CalendarHeaderProps {
  headerSize: 'small' | 'middle' | 'large';
  headerTitlePosition: 'center' | 'start';

  todayRouterPushAction?: () => void;
  displayDate: Date;
  setDisplayDate: React.Dispatch<React.SetStateAction<Date>>;
  beforeDisplayMonth: () => void;
  nextDisplayMonth: () => void
}

const WEEK_TITLE_ENG = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const CalendarHeader = ({
  headerSize,
  headerTitlePosition,
  todayRouterPushAction,
  displayDate,
  setDisplayDate,
  beforeDisplayMonth,
  nextDisplayMonth }: CalendarHeaderProps) => {

  return (
    <>
      {headerTitlePosition === 'center' &&
        <CalTitle className={`${headerSize} ${headerTitlePosition}`} >
          <button onClick={beforeDisplayMonth}><KeyboardArrowLeftIcon fontSize="small" /></button>
          <button onClick={() => {
            todayRouterPushAction && todayRouterPushAction();
            setDisplayDate(new Date());
          }}>
            {format(displayDate, 'MMMM. yyyy')}
          </button>
          <button onClick={nextDisplayMonth}><KeyboardArrowRightIcon fontSize="small" /></button>
        </CalTitle>
      }
      {headerTitlePosition === 'start' &&
        <CalTitle className={`${headerSize} ${headerTitlePosition}`}>
          <CalTitleText
            className={headerSize}
            onClick={() => {
              todayRouterPushAction && todayRouterPushAction();
              setDisplayDate(new Date());
            }}>
            {format(displayDate, 'MMMM. yyyy')}
          </CalTitleText>
          <ArrowButtonWrapper
            className={headerSize}
          >
            <button onClick={beforeDisplayMonth}><KeyboardArrowLeftIcon fontSize="small" color='inherit' /></button>
            <button onClick={nextDisplayMonth}><KeyboardArrowRightIcon fontSize="small" color='inherit' /></button>
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
  
  &.small{   
      font-size: 20px;
  }
  &.middle{   
      font-size: 26px;
  }
  &.large{   
      font-size: 32px;
  }
`
const ArrowButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  button{
    color: grey;
    display: flex;
    padding: 12px;
    padding: 6px;
  }
  &.small{   
    .button{
      padding: 6px;
    } 
  }
  &.middle{   
    .button{
      padding: 9px;
    } 
  }
  &.large{   
    .button{
      padding: 12px;
    } 
  }
`