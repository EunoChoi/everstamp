import { format } from "date-fns";


//icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styled from "styled-components";

interface CalendarHeaderProps {
  todayRouterPushAction?: () => void;
  displayDate: Date;
  setDisplayDate: React.Dispatch<React.SetStateAction<Date>>;
  beforeDisplayMonth: () => void;
  nextDisplayMonth: () => void
}

const CalendarHeader = ({
  todayRouterPushAction,
  displayDate,
  setDisplayDate,
  beforeDisplayMonth,
  nextDisplayMonth }: CalendarHeaderProps) => {

  const WEEK_TITLE_ENG = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];


  return (
    <>
      <CalTitle>
        <CalTitleText onClick={() => {
          todayRouterPushAction && todayRouterPushAction();
          setDisplayDate(new Date());
        }}>
          <span className="title">{format(displayDate, 'MMMM. yyyy')}</span>
        </CalTitleText>
        <ArrowButtonWrapper>
          <button onClick={beforeDisplayMonth}><KeyboardArrowLeftIcon fontSize="small" color='inherit' /></button>
          <button onClick={nextDisplayMonth}><KeyboardArrowRightIcon fontSize="small" color='inherit' /></button>
        </ArrowButtonWrapper>
      </CalTitle>
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

  padding: 24px 0;
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
  .title{
    text-transform: capitalize;
    color: rgb(var(--greyTitle));
    font-size: 32px;
    font-family: 'BMJUA';

    @media (min-width:1025px) { //desktop
      font-size: 36px;
    }
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
  }
`