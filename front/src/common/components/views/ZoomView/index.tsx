'use client';
import { getDiaryById } from "@/common/fetchers/diary";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import Image from "next/image";
import styled from "styled-components";
import Carousel from "../../ui/Carousel";
import { Modal } from "../../ui/Modal";

import { TextSlide } from "./TextSlide";
import { ZoomViewImage } from "./types";

interface ZoomViewProps {
  diaryId: string;
}

const ZoomView = ({ diaryId }: ZoomViewProps) => {
  const { data: diaryData, isError } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiaryById({ id: diaryId }),
    enabled: diaryId !== null
  });

  const date: Date = diaryData?.date;
  const headerTitle = format(date, 'yyyy.M.dd (eee)');
  const images = diaryData?.Images;

  const [zoomState, setZoomState] = useState<'zoom' | ''>('');

  const zoomToggle = () => {
    if (zoomState === '') setZoomState('zoom');
    else setZoomState('');
  }

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  return <Modal>
    <Modal.Header headerTitleText={headerTitle} />
    <ZoomViewContent>
      <CarouselWrapper>
        <Carousel gap={16} objectFit="contain">
          <TextSlide diaryData={diaryData} />
          {images?.map((e: ZoomViewImage) => (
            <InteractiveImage
              key={e.id}
              onClick={zoomToggle}
              className={zoomState}
              src={e.src}
              alt="zoomImage"
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL={e.src}
            />
          ))}
        </Carousel>
      </CarouselWrapper>
    </ZoomViewContent>
  </Modal>;
}

export default ZoomView;


const ZoomViewContent = styled(Modal.Content)`
  padding: 0 0 12px 0;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 12px;
`;

const InteractiveImage = styled(Image)`
  cursor: pointer;
  /* Carousel의 SlideItem에서 img 태그에 object-fit이 적용됨 */
  
  &.zoom {
    object-fit: cover !important;
  }
`;
