'use client';

import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDiary } from "@/common/fetchers/diary";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import $Modal from "@/common/styles/common_modal";
import DiaryInputDate from "../../../../app/(routes)/main/(withLayout)/calendar/_components/DiaryInputModal/Date";
import Indicator from "../../ui/Indicator";
import useCustomRouter from "@/common/hooks/useCustomRouter";



interface Props {
  diaryId: string;
}

interface ImageProps {
  id: number;
  src: string;
}

const ZoomModal = ({ diaryId }: Props) => {
  const router = useCustomRouter();

  const { data: diaryData, isError } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiary({ id: diaryId }),
    enabled: diaryId !== null
  });


  const date: Date = diaryData?.date;
  const images = diaryData?.Images;
  const text = diaryData?.text;

  const [zoomState, setZoomState] = useState<'zoom' | ''>('');

  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const indicatorLength = images?.length + 1;

  const emotions = [
    <span className="emotion0">#Angry</span>,
    <span className="emotion1">#Sad</span>,
    <span className="emotion2">#Common</span>,
    <span className="emotion3">#Happy</span>,
    <span className="emotion4">#Joyful</span>];


  const zoomToggle = () => {
    if (zoomState === '') setZoomState('zoom');
    else setZoomState('');
  }

  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [diaryData])

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  return (
    <$Modal.Background onClick={() => router.back()}>
      <ZoomModalWrapper onClick={(e) => e.stopPropagation()}>
        <$Modal.Top>
          <button onClick={() => router.back()}><ArrowBackIosIcon color="inherit" /></button>
          <DiaryInputDate date={date} />
          <button></button>
        </$Modal.Top>

        <SlideWrapper
          ref={slideWrapperRef}
          onScroll={(e) => {
            setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
          }}
        >

          <TextWrapper className="slideChild">
            <div className="info">
              <div>{emotions[diaryData?.emotion]}</div>
              <div>{diaryData?.Habits?.map((e: { name: string }) => <span key={e.name}>#{e.name} </span>)}</div>
            </div>
            <div className="text">
              {text}
            </div>
          </TextWrapper>

          {images?.map((e: ImageProps) =>
            <ImageWrapper key={e.id} className="slideChild">
              <Img onClick={zoomToggle} className={zoomState} src={e.src} alt="zoomImage" width={400} height={400} placeholder="blur" blurDataURL={e.src} />
            </ImageWrapper>)}

        </SlideWrapper>

        {indicatorLength > 1 && <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={indicatorLength} />}
      </ZoomModalWrapper>
    </$Modal.Background>);
}

export default ZoomModal;

const ZoomModalWrapper = styled($Modal.Wrapper)`
  padding-bottom: 16px;

  @media (min-width:1024px) { //desktop
    width: 70%;
    height: 80%;
  }
`
const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */

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
    height: 100%;

    white-space: pre-wrap;
    overflow-wrap: break-word;

    color: rgb(var(--greyTitle));
  }

  @media (max-width: 479px) { //mobile port
    padding: 24px;
    .text{
      font-size: 18px;
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 24px;
    .text{
      font-size: 18px;
    }
  }
  @media (min-width:1024px) { //desktop
    padding: 48px;
    .text{
      font-size: 20px;
    }
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
  height: 100px;
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
