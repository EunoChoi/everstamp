'use client';

import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDiary } from "@/app/(afterLogin)/_lib/diary";

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Indicator from "../indicator";

interface ImageProps {
  id: number;
  src: string;
}

const ZoomModal = () => {
  //param diary id만 가져옴
  //useQuery로 data 가져옴
  //가져온걸 뿌림
  const params = useSearchParams();
  const diaryId = params.get('id');

  const { data: diaryData } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiary({ id: diaryId }),
    enabled: diaryId !== null
  });


  const date: Date = diaryData?.date;
  const images = diaryData?.Images;
  const text = diaryData?.text;

  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const indicatorLength = images?.length + 1;


  const historyBack = useCallback(() => {
    history.back();
  }, []);

  useEffect(() => {
    slideWrapperRef.current?.scrollTo({ left: 0 });
  }, [diaryData])

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

        <TextWrapper className="slideChild"><div className="text">{text}</div></TextWrapper>

        {images?.map((e: ImageProps) =>
          <ImageWrapper key={e.id} className="slideChild">
            <Img src={e.src} alt="zoomImage" width={400} height={400} placeholder="blur" blurDataURL={e.src} />
          </ImageWrapper>)}

      </SlideWrapper>

      {indicatorLength > 1 && <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={indicatorLength} />}

      <Buttons>
        <Button onClick={historyBack} >
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
  background-color: whitesmoke;
  border-top: solid 1px rgba(0,0,0,0.1);

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

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
    color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'} !important;
  }
`

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  align-items: start;

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
  @media (min-height:480px) and (min-width:1024px) { //desktop
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
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  width: 100%;
  height: 100%;

  @media (min-height:480px) and (min-width:1024px) { //desktop
    width: 70%;
    height: 80%;
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
    color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
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
