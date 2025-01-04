'use client';

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';

import $Modal from "@/common/styles/common_modal";
import DiaryDate from "../../ui/DiaryDate";
import Indicator from "../../ui/Indicator";
import useCustomRouter from "@/common/hooks/useCustomRouter";


interface ImageProps {
  id: number;
  src: string;
}


const DesktopZoomModal = ({ diaryData }: any) => {
  const router = useCustomRouter();

  const emotions = [
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
    <ZoomModalWrapper onClick={(e) => e.stopPropagation()}>
      <ZoomContent>
        <ZoomContentLeft className={indicatorLength === 0 ? 'full' : ''} >
          <div className="date"><DiaryDate date={date} /></div>
          <div className="info">
            <div>{emotions[diaryData?.emotion]}</div>
            <div>{diaryData?.Habits?.map((e: { name: string }) => <span key={e.name}>#{e.name} </span>)}</div>
          </div>
          <div className="text">{text}</div>
          <BackButton onClick={() => router.back()}><CloseIcon color="inherit" /></BackButton>
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

const BackButton = styled.button``
const ZoomModalWrapper = styled($Modal.Wrapper)`
  background-color: #fff;
  @media (min-width:1024px) { //desktop
    width: 85%;
    height: 85%;
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

  background-color : ${(props) => props.theme.point ? props.theme.point + '50' : '#EFF0F6'};
`
const ZoomContentLeft = styled.div`
  height: 100%;
  width: 350px;
  flex-shrink: 0;
  
  padding: 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.full{
    width: 100%;
  }
  .date{
    margin-bottom:32px;
  }
  .info{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  .text{
    overflow-y: scroll;
    width: 100%;
    height: 70%;

    white-space: pre-wrap;
    overflow-wrap: break-word;

    color: rgb(var(--greyTitle));
    font-size: 20px;
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
