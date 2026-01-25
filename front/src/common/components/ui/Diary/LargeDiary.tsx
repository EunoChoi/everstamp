'use client';

import type { DiaryData } from '@/common/types/diary';
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import CommonCarousel from "../CommonCarousel";
import DiaryHabits from "./DiaryHabits";
import DiaryHeader from "./DiaryHeader";

interface Props {
  diaryData: DiaryData;
}

// 리스트에서 사용하는 큰 일기 카드
const LargeDiary = ({ diaryData }: Props) => {
  const router = useRouter();
  const { Images: images } = diaryData;
  const hasImages = images.length >= 1;

  const handleContentClick = () => {
    router.push(`/app/inter/zoom?id=${diaryData.id}`, { scroll: false });
  };

  return (
    <Wrapper>
      <DiaryHeader diaryData={diaryData} type="large" />
      <Content onClick={handleContentClick}>
        {hasImages && (
          <CommonCarousel height="300px">
            {images.map((img) => (
              <CarouselImage
                key={img.id}
                src={img.src}
                width={400}
                height={400}
                alt="diary image"
              />
            ))}
          </CommonCarousel>
        )}
        <Text className={hasImages ? 'hasImages' : ''}>
          {diaryData.text}
        </Text>
      </Content>
      <DiaryHabits habits={diaryData.Habits} />
    </Wrapper>
  );
};

export default LargeDiary;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 16px;
  margin: 16px 0;
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
  
  font-size: ${(props) => props.theme.fontSize ?? '15px'};
  line-height: 1.8;
  color: rgb(var(--greyTitle));

  &.hasImages{
    -webkit-line-clamp: 4;
  }
  @media (max-width: 479px) {
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

  box-sizing: border-box;

  border: 2px solid rgba(0,0,0,0.07);
  border-radius: 16px;
  background-color: white;

  /* padding: 14px 14px; */
  @media (max-width: 479px) {
    min-height: 200px;
  }
  @media (min-width:1024px) {
    min-height: 300px;
  }
`
