'use client';

import type { DiaryData } from '@/common/types/diary';
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import DiaryAddButton from "./DiaryAddButton";
import DiaryHabits from "./DiaryHabits";
import DiaryHeader from "./DiaryHeader";

interface Props {
  diaryData: DiaryData;
}

// 캘린더용 작은 일기 카드
const SmallDiary = ({ diaryData }: Props) => {
  const router = useRouter();
  const slideRef = useRef<HTMLDivElement>(null);
  const dateString = format(new Date(diaryData.date), 'yyyy-MM-dd');

  const hasText = diaryData.visible;
  const images = diaryData.Images ?? [];

  // 일기 변경시 슬라이드 초기화
  useEffect(() => {
    slideRef.current?.scrollTo({ left: 0 });
  }, [diaryData]);

  const handleNavigateToZoom = () => {
    if (diaryData.id) {
      router.push(`/app/inter/zoom?id=${diaryData.id}`, { scroll: false });
    }
  };

  // 일기 있음
  if (hasText) {
    return (
      <Wrapper ref={slideRef}>
        <FirstSlide className="slideChild">
          <DiaryHeader diaryData={diaryData} type="small" />
          <TextWrapper onClick={handleNavigateToZoom}>
            <Text>{diaryData.text}</Text>
            {images.length > 0 && (
              <MoreImagesText>{images.length} images ➝</MoreImagesText>
            )}
          </TextWrapper>
          <DiaryHabits habits={diaryData.Habits} />
        </FirstSlide>
        {images.map((img) => (
          <SlideImage
            onClick={handleNavigateToZoom}
            key={img.id}
            className="slideChild"
            src={img.src}
            alt="diary image"
            width={300}
            height={300}
            blurDataURL={img.src}
            placeholder="blur"
          />
        ))}
      </Wrapper>
    );
  }

  // 일기 없음
  return (
    <Wrapper>
      <EmptySlide>
        <DiaryHeader diaryData={diaryData} type="small" />
        <DiaryAddButton date={dateString} />
        <DiaryHabits habits={diaryData.Habits} />
      </EmptySlide>
    </Wrapper>
  );
};

export default SmallDiary;

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  overflow: hidden;
  width: 100%;
  height: 200px;

  border: 2px solid rgba(0,0,0,0.07);
  border-radius: 16px;
  background-color: white;

  /* 슬라이드 */
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .slideChild {
    scroll-snap-align: center;
    scroll-snap-stop: always !important;
  }
`

const FirstSlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  flex-shrink: 0;
`

const EmptySlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 14px;
  padding-right: 14px;
`

const Text = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  @media (min-width:1025px) {
    -webkit-line-clamp: 5;
  }

  overflow: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  line-height: 1.6;
  font-size: ${(props) => props.theme.fontSize ?? '15px'};
  color: rgb(var(--greyTitle));
`

const MoreImagesText = styled.button`
  align-self: flex-end;
  text-align: right;
  font-size: 14px;
  color: ${(props) => props.theme.themeColor ?? '#979FC7'};
`

const SlideImage = styled(Image)`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
