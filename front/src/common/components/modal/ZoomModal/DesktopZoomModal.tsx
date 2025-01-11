'use client';

import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import useCustomRouter from "@/common/hooks/useCustomRouter";
import $Modal from "@/common/styles/common_modal";
import DiaryDate from "../../ui/DiaryDate";
import Indicator from "../../ui/Indicator";

import emotion0 from '/public/img/emotion/emotion0.png';
import emotion1 from '/public/img/emotion/emotion1.png';
import emotion2 from '/public/img/emotion/emotion2.png';
import emotion3 from '/public/img/emotion/emotion3.png';
import emotion4 from '/public/img/emotion/emotion4.png';

interface ImageProps {
  id: number;
  src: string;
}


const DesktopZoomModal = ({ diaryData }: any) => {
  const router = useCustomRouter();

  const emotionImages = [emotion0, emotion1, emotion2, emotion3, emotion4];
  const emotionNames = [
    <span className="emotion0">#Angry</span>,
    <span className="emotion1">#Sad</span>,
    <span className="emotion2">#Common</span>,
    <span className="emotion3">#Happy</span>,
    <span className="emotion4">#Joyful</span>];

  const date: Date = diaryData?.date;
  const images = diaryData?.Images;
  const text = diaryData?.text;

  const [zoomState, setZoomState] = useState<'zoom' | ''>('');

  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const indicatorLength = images?.length;

  const zoomToggle = () => {
    if (zoomState === '') setZoomState('zoom');
    else setZoomState('');
  }

  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [diaryData])


  return (<$Modal.Background onClick={() => router.back()}>
    <ZoomModalWrapper className={indicatorLength === 0 ? 'noImages' : ''} onClick={(e) => e.stopPropagation()}>
      <ZoomContent>
        <ZoomContentLeft className={indicatorLength === 0 ? 'noImages' : ''} >
          <div><DiaryDate date={date} /></div>
          <EmotionImageWrapper>
            <Image
              width={72}
              height={72}
              src={emotionImages[diaryData?.emotion]}
              alt={`${emotionNames[diaryData?.emotion]}`} />
          </EmotionImageWrapper>
          {diaryData?.Habits.length > 0 &&
            <HabitWrapper>
              <div>{diaryData?.Habits?.map((e: { name: string }) => <span key={e.name}>#{e.name}</span>)}</div>
            </HabitWrapper>}
          <Text>{text}</Text>

          <button onClick={() => router.back()}><CloseIcon color="inherit" /></button>
        </ZoomContentLeft>
        {indicatorLength >= 1 && <ZoomContentRight>
          <SlideWrapper
            ref={slideWrapperRef}
            onScroll={(e) => {
              setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
            }}
          >
            {images?.map((e: ImageProps) =>
              <ImageWrapper key={e.id} className="slideChild">
                <Img onClick={zoomToggle} className={zoomState} src={e.src} alt="zoomImage" width={400} height={400} placeholder="blur" blurDataURL={e.src} />
              </ImageWrapper>)}
          </SlideWrapper>
          {indicatorLength > 1 && <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={indicatorLength} />}
        </ZoomContentRight>}
      </ZoomContent>
    </ZoomModalWrapper>
  </$Modal.Background>);
}

export default DesktopZoomModal;

const HabitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};

  width: 100%;

  >div{
    display: flex;
    flex-flow: wrap;
    span{
      flex-shrink: 0;
      margin-right: 8px;
      white-space: nowrap;
    }
  }
`
const Text = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;

  font-size: 16px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  line-height: 1.8;

  color: rgb(var(--greyTitle));
`
const EmotionImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const ZoomModalWrapper = styled($Modal.Wrapper)`
  background-color: #fff;
  width: 85%;
  height: 85%;
  &.noImages{
    width: 45%;
  }
`
const ZoomContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`
const ZoomContentRight = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background-color : ${(props) => props.theme.point ? props.theme.point + '40' : '#EFF0F6'};
`
const ZoomContentLeft = styled.div`
  height: 100%;
  width: 400px;
  flex-shrink: 0;
  
  padding: 32px;
  gap: 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &.noImages{
    width: 100%;
  }
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
