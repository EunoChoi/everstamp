'use client';

import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDiary } from "@/app/(afterLogin)/_lib/diary";

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Indicator from "../indicator";

interface Props {
  diaryId: string;
}

interface ImageProps {
  id: number;
  src: string;
}

const ZoomModal = ({ diaryId }: Props) => {
  const router = useRouter();

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  const { data: diaryData } = useQuery({
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

  return (<Wrapper onClick={() => router.back()}>
    <Modal onClick={(e) => e.stopPropagation()}>
      <DiaryDate>
        <span>{date && format(date, 'yyyy. M. dd')}</span>
        <span className="week">{date && format(date, '(eee)')}</span>
      </DiaryDate>

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

      <Buttons className={(isInStandaloneMode() && isIos()) ? 'iosPwa' : ''}>
        <Button onClick={() => router.back()} >
          <CancelOutlinedIcon className="icon" />
        </Button>
      </Buttons>
    </Modal>
  </Wrapper>);
}

export default ZoomModal;


const Buttons = styled.div`
  width: 100%;
  height: var(--mobileNav);
  /* flex-shrink: 0; */
  background-color: #f9f9f9;
  border-top: solid 1px rgba(0,0,0,0.1);

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  &.iosPwa{
    height: calc(var(--mobileNav) + 20px);
    padding-bottom: 20px;
  }

  @media (max-width: 479px) { //mobile port
    border-radius: 0px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    border-radius: 0px;
  }
`
const Button = styled.button`
  .icon{
    color: rgba(0,0,0,0.3) !important;
  }
  .icon:hover{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);
`
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;

  background-color: white;
  
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  width: 100%;
  height: 100%;

  @media (min-width:1024px) { //desktop
    width: 70%;
    height: 80%;
    border-radius: 8px;
  }
`

const DiaryDate = styled.div`
  color: rgb(var(--greyTitle));
  font-weight: 600;
  font-size: 20px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: end;
  span{
    padding: 4px;
  }
  .week{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    /* display: none; */
  }
  @media (min-width:1024px) { //desktop
    font-size: 26px;
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
