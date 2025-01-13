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
        <CalHeaderButtons className="start">
          <button onClick={beforeDisplayMonth}><KeyboardArrowLeftIcon fontSize="small" /></button>
        </CalHeaderButtons>
        <CalTitleText onClick={() => {
          todayRouterPushAction && todayRouterPushAction();
          setDisplayDate(new Date());
        }}>
          <span className="month">{format(displayDate, 'yyyy.MM')}</span>
        </CalTitleText>
        <CalHeaderButtons className="end">
          <button onClick={nextDisplayMonth}><KeyboardArrowRightIcon fontSize="small" /></button>
        </CalHeaderButtons>
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
  
  padding: 2px 0px;
  >*{
    width: 30%;
  }
`
const CalWeeks = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-transform: capitalize;
  padding: 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--greyTitle));

  span{
    width: 100%;
    text-align: center;
  }
`

const CalTitleText = styled.button`  
  text-align: center;
  text-transform: capitalize;

  font-size: 20px;
  color: rgb(var(--greyTitle));

  .month{
    font-weight: 600;
  }
  .year{
    font-weight: 500;
    margin-left: 8px;
  }
`
const CalHeaderButtons = styled.div`
  color: rgb(var(--greyTitle));
  display: flex;
  &.start{
    justify-content: start;
  }
  &.end{
    justify-content: end;
  }
  button{
    padding: 0 8px;
  }
`