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
  const date = format(diaryData?.date, 'yy. M. d');
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
      <span className="week">{day}</span>
      <span className="date">{date}</span>
      <span className="emotion">{isVisible && emotions[diaryData?.emotion]}</span>
    </DateInfo>
    <Edit onClick={onOpenMenu} >
      {diaryData.visible && <MoreVertIcon color="inherit" fontSize="inherit" />}
    </Edit>
    <DiaryMenus isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} position={wrapperHeight} diaryData={diaryData} />
  </Wrapper>);
}

export default DiaryHeader;



const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: grey;
  border-radius: 12px;
  font-size: 14px;
  color: white;

  padding: 2px 12px;
  margin: 4px;
`
const Wrapper = styled.div`
  width: 100%;
  padding : 8px 16px;

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
    font-size : 20px;
  }
  &.large{
    span{
      font-size : 24px;
      @media (max-width: 479px) { //mobile port
        font-size: 20px;
      }
    }
  }
  .week{
    font-weight: 600;
    color: rgb(var(--greyTitle));
  }
  .date{
    color: grey;
  }
  .emotion{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
`
const Edit = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  color: #a5a5a5;
`