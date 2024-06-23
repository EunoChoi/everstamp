'use client';

import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDiaryById } from "@/app/(afterLogin)/_lib/getDiaryById";

interface ImageProps {
  id: number;
  src: string;
}

const Zoom = () => {
  //param diary id만 가져옴
  //useQuery로 data 가져옴
  //가져온걸 뿌림
  const params = useSearchParams();
  const diaryId = params.get('id');

  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiaryById(diaryId),
    enabled: diaryId !== null
  });


  const date: Date = diaryData?.date;
  const images = diaryData?.Images;
  const text = diaryData?.text;

  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const indicatorLength = images?.length + 1;
  const indicatorArr = indicatorLength ? new Array(indicatorLength).fill(0) : [0];


  const historyBack = useCallback(() => {
    history.back();
  }, []);

  return (<Wrapper onClick={historyBack}>
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
        <TextWrapper className="slideChild">{text}</TextWrapper>
        {images?.map((e: ImageProps) =>
          <ImageWrapper key={e.id} className="slideChild">
            <Img src={e.src} alt="zoomImage" width={500} height={500} blurDataURL={e.src} />
          </ImageWrapper>)}
      </SlideWrapper>
      {indicatorLength > 1 && <IndicatorWrapper>
        {indicatorArr && indicatorArr.map((_: any, i: number) =>
          <div
            key={`indicator${i}`}
            className={page === i ? 'current' : ''}
            onClick={() => {
              slideWrapperRef.current?.scrollTo({
                left: slideWrapperRef.current.clientWidth * i,
                behavior: "smooth"
              })
            }}
          />)}
      </IndicatorWrapper>}

    </Modal>
  </Wrapper>);
}

export default Zoom;

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
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

  * {
    color: rgb(var(--greyTitle));
  }
`
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  width: 100%;
  height: 100%;

  /* @media (max-width: 479px) { //mobile port
    width: 90%;
    height: 90%;
    max-height: 500px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 50%;
    min-width: 450px;
    height: 80%;
    max-height: 500px;
  } */
  @media (min-height:480px) and (min-width:1024px) { //desktop
    width: 90%;
    height: 90%;
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
    color: rgb(var(--point));
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    /* display: none; */
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
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
const IndicatorWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin: 8px 0;
  height: auto;
  div {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: rgb(var(--lightGrey2));
    border: 1px solid rgba(0,0,0,0.05);

    margin: 4px;
    @media (max-width: 479px) { //mobile port
      width: 8px;
      height: 8px;
      margin: 2px;
    }
  }
  /* div:last-child{
    border-radius: 2px;
    background-color: rgba(var(--point2), 0.5);
  } */
  .current {
    background-color: rgb(var(--point)) !important;
  }
`