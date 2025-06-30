'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import useCustomRouter from "@/common/hooks/useCustomRouter";
import $Modal from "@/common/styles/common_modal";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Indicator from "../../ui/Indicator";
import DiaryDate from "./DiaryDate";

import emotion0 from '/public/img/emotion/emotion0.png';
import emotion1 from '/public/img/emotion/emotion1.png';
import emotion2 from '/public/img/emotion/emotion2.png';
import emotion3 from '/public/img/emotion/emotion3.png';
import emotion4 from '/public/img/emotion/emotion4.png';


interface ImageProps {
  id: number;
  src: string;
}

export const MobileZoomView = ({ diaryData }: any) => {
  const router = useCustomRouter();

  const emotionImages = [emotion0, emotion1, emotion2, emotion3, emotion4];
  const emotionNames = ['Angry', 'Sad', 'Common', 'Happy', 'Joyful'];

  const date: Date = diaryData?.date;
  const images = diaryData?.Images;
  const text = diaryData?.text;

  const [zoomState, setZoomState] = useState<'zoom' | ''>('');

  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const indicatorLength = images?.length + 1;

  const zoomToggle = () => {
    if (zoomState === '') setZoomState('zoom');
    else setZoomState('');
  }

  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [diaryData])


  return (<$Modal.Background onClick={() => router.back()}>
    <ZoomModalWrapper onClick={(e) => e.stopPropagation()}>
      <$Modal.Top>
        <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
        <DiaryDate date={date} />
        <button></button>
      </$Modal.Top>
      <SlideWrapper
        ref={slideWrapperRef}
        onScroll={(e) => {
          setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
        }}
      >
        <TextContentWrapper className="slideChild">
          <EmotionImageWrapper>
            <Image
              width={64}
              height={64}
              src={emotionImages[diaryData?.emotion]}
              alt={`${emotionNames[diaryData?.emotion]}`} />
          </EmotionImageWrapper>
          {diaryData?.Habits.length > 0 &&
            <HabitWrapper>
              {diaryData?.Habits?.map((e: { name: string }) => <span key={e.name}>#{e.name}</span>)}
            </HabitWrapper>}
          <Text>{text}</Text>

        </TextContentWrapper>
        {images?.map((e: ImageProps) =>
          <ImageWrapper key={e.id} className="slideChild">
            <Img onClick={zoomToggle} className={zoomState} src={e.src} alt="zoomImage" width={400} height={400} placeholder="blur" blurDataURL={e.src} />
          </ImageWrapper>)}
      </SlideWrapper>
      {indicatorLength > 1 && <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={indicatorLength} />}
    </ZoomModalWrapper>
  </$Modal.Background>);
}


const EmotionImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    img{
      width: 48px;
      height: 48px;
    }
  }
`

const ZoomModalWrapper = styled($Modal.Wrapper)`
  padding-bottom: 16px;

  @media (min-width:1025px) { //desktop
    width: 85%;
    height: 85%;
  }
`

const TextContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 24px;
  gap: 32px;
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 12px 5dvw;
    gap: 12px;
  }
`
const HabitWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  span{
    /* font-weight: 500; */
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    font-size: var(--font-size-base);
    flex-shrink: 0;
    margin-right: 8px;
    white-space: nowrap;
  }
`
const Text = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;

  font-size: var(--font-size-base);
  line-height: 1.8;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  color: rgb(var(--greyTitle));
`
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`
const Img = styled(Image)`
  width: 100%;
  height: 100%;

  object-fit: contain;
  &.zoom{
    object-fit: cover;
  }
`
const SlideWrapper = styled.div`
  scroll-snap-type: x mandatory;

  display: flex;
  justify-content: start;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow-x: scroll;

  .slideChild{
    scroll-snap-align: start;
    scroll-snap-stop: always !important;
    margin-right: 16px;
    &:last-child{
      margin-right: 0;
    }
  }
`
