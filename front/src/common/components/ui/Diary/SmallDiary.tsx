'use client';

import styled from "styled-components";



import DiaryAddButton from "./DiaryAddButton";
import DiaryHabits from "./DiaryHabits";
import DiaryHeader from "./DiaryHeader";
import DiarySlide from "./DiarySlide";


interface ImageProps {
  id: string;
  src: string;
}

interface Habit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  priority: number;
}

interface Props {
  diaryData: {
    email: string;
    id: number;
    date: Date;
    text: string;
    emotion: number;
    Images: Array<ImageProps>;
    Habits: Array<Habit>;
    visible: boolean;
  };
}

const SmallDiary = ({ diaryData }: Props) => {
  const date = new Date(diaryData.date).getTime();
  let defaultHeight = '110px';

  return (
    <Wrapper>
      <DiaryHeader diaryData={diaryData} type='small' />
      {diaryData?.visible ?
        <DiarySlide diaryData={diaryData} height={defaultHeight} /> : <DiaryAddButton date={date} height={defaultHeight} />}
      <DiaryHabits habits={diaryData?.Habits} />
    </Wrapper >);
}
export default SmallDiary;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-between;
  align-items: start;
  flex-shrink: 0;

  width: 100%;
  /* max-width: 600px; */
  height: 215px;
  overflow: hidden;

  border: 2px solid rgba(0,0,0,0.07);
  border-radius: 16px;
  background-color: white;
`