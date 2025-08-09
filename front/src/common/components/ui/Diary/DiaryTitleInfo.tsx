import { emotions } from '@/common/images/emotions';
import { DiaryWithRelations } from '@/server/types';
import { format } from 'date-fns';
import styled from 'styled-components';



interface Props {
  diaryData: DiaryWithRelations;
}
const DiaryTitleInfo = ({ diaryData }: Props) => {
  const date = format(diaryData.date, 'yy.MM.dd');
  const day = format(diaryData.date, 'eee');

  return (<Wrapper>
    <span className="date">{date}</span>
    <span className="week">{day}</span>
    <span className="emotion">{diaryData.emotion !== undefined ? emotions[diaryData.emotion]?.alt : ''}</span>
  </Wrapper>);
}

export default DiaryTitleInfo;

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