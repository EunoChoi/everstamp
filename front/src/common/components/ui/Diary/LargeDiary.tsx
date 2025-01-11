'use client';

import styled from "styled-components";


import useCustomRouter from "@/common/hooks/useCustomRouter";

import Image from "next/image";
import CommonCarousel from "../CommonCarousel";
import DiaryAddButton from "./DiaryAddButton";
import DiaryHabits from "./DiaryHabits";
import DiaryHeader from "./DiaryHeader";



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

const LargeDiary = ({ diaryData }: Props) => {
  let defaultHeight = '100%';
  const date = new Date(diaryData.date).getTime();
  const images = diaryData.Images;
  const router = useCustomRouter();

  return (
    <Wrapper>
      <DiaryHeader diaryData={diaryData} type='large' />
      {diaryData?.visible ?
        <Content onClick={() => router.push(`/app/inter/zoom?id=${diaryData.id}`, { scroll: false })} >
          {images.length >= 1 &&
            <CommonCarousel height="300px" >
              {images.map(img =>
                <CarouselImage
                  key={img.src}
                  src={img.src}
                  width={400} height={400}
                  alt="images" />)}
            </CommonCarousel>}
          <Text className={images.length >= 1 ? 'hasImages' : ''}>
            {diaryData.text}
          </Text>
        </Content> :
        <DiaryAddButton date={date} height={defaultHeight} />
      }
      <DiaryHabits habits={diaryData?.Habits} />
    </Wrapper >);
}
export default LargeDiary;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Text = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  flex-shrink: 0;
  overflow: hidden;

  padding: 0 16px;
  margin: 16px 0;
  
  font-size: 16px;
  font-weight: 500;
  line-height: 1.8;
  color: rgb(var(--greyTitle));

  &.hasImages{
    -webkit-line-clamp: 4;
  }
  @media (max-width: 479px) { //mobile port
    -webkit-line-clamp: 3;
    &.hasImages{
      -webkit-line-clamp: 3;
    }
  }
`
const CarouselImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  flex-shrink: 0;

  width: 100%;
  height: auto;
  min-height: 250px;
  overflow: hidden;

  gap: 12px;
  padding: 8px 0;
  box-sizing: border-box;

  border: 2px solid rgba(0,0,0,0.07);
  border-radius: 16px;
  background-color: white;

  @media (max-width: 479px) { //mobile port
    min-height: 200px;
    padding: 4px 0;
    gap: 4px;
  }
`