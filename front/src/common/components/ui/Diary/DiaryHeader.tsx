import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';
import styled from 'styled-components';


import { useEffect, useRef, useState } from 'react';
import DiaryMenus from './DiaryMenus';

interface Props {
  type: 'small' | 'large';
  diaryData: {
    date: Date;
    visible: boolean;
    emotion: number;
    text: string;
    id: number;
  }
}
const DiaryHeader = ({ diaryData, type }: Props) => {
  const emotions = ['#Angry', '#Sad', '#Common', '#Happy', '#Joyful'];
  const date = format(diaryData?.date, 'yy.MM.dd');
  const day = format(diaryData?.date, 'eee');
  const isVisible = diaryData?.visible;

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState<undefined | number>();

  const onOpenMenu = () => {
    setMenuOpen(c => !c);
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [diaryData])
  useEffect(() => {
    setWrapperHeight(wrapperRef.current?.offsetHeight);
  }, [])


  return (<Wrapper ref={wrapperRef}>
    <DateInfo className={type}>
      <span className="date">{date}</span>
      <span className="week">{day}</span>
      <span className="emotion">{isVisible && emotions[diaryData?.emotion]}</span>
    </DateInfo>
    <Edit onClick={onOpenMenu} >
      {diaryData.visible && <MoreVertIcon color="inherit" fontSize="inherit" />}
    </Edit>
    <DiaryMenus isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} position={wrapperHeight} diaryData={diaryData} />
  </Wrapper>);
}

export default DiaryHeader;

const Wrapper = styled.div`
  width: 100%;
  padding : 12px 16px;
  padding-bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
`
const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  span{
    font-weight:500;
    font-size : 20px;
  }
  .week{
    color: grey;
  }
  .date{
    color: rgb(var(--greyTitle));
  }
  .emotion{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
`
const Edit = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  color: #a5a5a5;
`