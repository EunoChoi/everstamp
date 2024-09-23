import { format } from "date-fns";
import styled from "styled-components";

interface Props {
  date: Date | undefined;
}

const DiaryInputDate = ({ date }: Props) => {
  if (!date) return <></>;
  return (
    <DiaryDate>
      <span>{format(date, 'yyyy. M. dd')}</span>
      <span className="week">{format(date, '(eee)')}</span>
    </DiaryDate>
  );
}

export default DiaryInputDate;


const DiaryDate = styled.div`
  color: rgb(var(--greyTitle));
  font-weight: 600;
  font-size: 20px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: end;
  span{
    padding: 4px;
  }
  .week{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    /* display: none; */
  }
  @media (min-width:1024px) { //desktop
    font-size: 24px;
  }
`