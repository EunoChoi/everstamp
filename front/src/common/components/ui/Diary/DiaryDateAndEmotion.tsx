import { format } from 'date-fns';
import styled from 'styled-components';



interface Props {
  selectedDate: string;
  emotion?: number;
}
const DiaryDateAndEmotion = ({ selectedDate, emotion }: Props) => {
  const selectedDateAsDate = new Date(selectedDate);
  const emotions = ['Angry', 'Sad', 'Common', 'Happy', 'Joyful'];
  const date = format(selectedDateAsDate, 'yy.MM.dd');
  const day = format(selectedDateAsDate, 'eee');

  return (<Wrapper>
    <span className="date">{date}</span>
    <span className="week">{day}</span>
    <span className="emotion">{emotion !== undefined ? emotions[emotion] : ''}</span>
  </Wrapper>);
}

export default DiaryDateAndEmotion;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 12px;
  
  .week, .date, .emotion{
    font-weight: 500;
    font-size : 20px;
  }
  .week{  color: grey;}
  .date{color: rgb(var(--greyTitle));}
  .emotion{color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};}
`