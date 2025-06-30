'use client';
import { getDiaryById } from "@/common/fetchers/diary";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import Image from "next/image";
import styled from "styled-components";
import Indicator from "../../ui/Indicator";
import { Modal } from "../../ui/Modal";

import { TextSlide } from "./TextSlide";
import { ZoomViewImage } from "./types";

interface ZoomViewProps {
  diaryId: string;
}

export const ZoomView = ({ diaryId }: ZoomViewProps) => {
  const { data: diaryData, isError } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiaryById({ id: diaryId }),
    enabled: diaryId !== null
  });

  const date: Date = diaryData?.date;
  const headerTitle = format(date, 'yyyy.M.dd (eee)');
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

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  return <Modal>
    <Modal.Header headerTitleText={headerTitle} />
    <MobileZoomViewContent>
      <SlideWrapper
        ref={slideWrapperRef}
        onScroll={(e) => {
          setPage(Math.round((e.currentTarget?.scrollLeft - 1) / e.currentTarget?.clientWidth));
        }}
      >
        <TextSlide diaryData={diaryData} />
        {images?.map((e: ZoomViewImage) =>
          <ImageWrapper key={e.id} className="slideChild">
            <Img onClick={zoomToggle} className={zoomState} src={e.src} alt="zoomImage" width={400} height={400} placeholder="blur" blurDataURL={e.src} />
          </ImageWrapper>)}
      </SlideWrapper>
      {indicatorLength > 1 && <Indicator slideWrapperRef={slideWrapperRef} page={page} indicatorLength={indicatorLength} />}
    </MobileZoomViewContent>
  </Modal>;
}


const MobileZoomViewContent = styled(Modal.Content)`
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 12px;
`;
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
