'use client';
import { getDiaryById } from "@/common/actions/diary";
import { authAction } from "@/common/auth/authAction";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { parseLocalDate } from "@/common/utils/date/parseLocalDate";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Carousel from "../../ui/Carousel";
import { Modal } from "../../ui/Modal";
import { ModalBody } from "../../ui/Modal/ModalBody";
import { ModalHeader } from "../../ui/Modal/ModalHeader";

import { TextSlide } from "./TextSlide";
import { ZoomViewImage } from "./types";

interface ZoomViewProps {
  diaryId: string;
}

const ZoomView = ({ diaryId }: ZoomViewProps) => {
  const router = useRouter();
  const { data: diaryData, isError } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => authAction(() => getDiaryById({ id: diaryId })),
    enabled: diaryId !== null
  });

  const date = diaryData?.date;  // yyyy-MM-dd
  const dateForDisplay = date ? parseLocalDate(date) : null;
  const formattedDate = dateForDisplay ? format(dateForDisplay, 'yyyy년 M월 d일') : '';
  const formattedDay = dateForDisplay ? format(dateForDisplay, 'eeee', { locale: ko }) : '';
  const headerTitle = date ? `${formattedDate} ${formattedDay}` : '';
  const images = diaryData?.Images;

  const [zoomState, setZoomState] = useState<'zoom' | ''>('');

  const zoomToggle = () => {
    if (zoomState === '') setZoomState('zoom');
    else setZoomState('');
  }

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  if (!diaryData) return null;

  return <Modal
    ariaLabel={headerTitle}
    contentClassName="flex min-h-0 flex-col desktop:h-[85dvh] desktop:max-h-[85%] desktop:w-[500px]"
    isOpen
    onClose={() => router.back()}
    overlayClassName="z-[99999]"
    variant={{ base: 'full', tablet: 'full', desktop: 'center' }}
  >
    <ModalHeader title={headerTitle} onBack={() => router.back()} />
    <ModalBody>
      <div className="h-full w-full">
        <Carousel>
          <TextSlide diaryData={diaryData} />
          {images?.map((e: ZoomViewImage) => (
            <Image
              key={e.id}
              onClick={zoomToggle}
              className={zoomState === 'zoom' ? "h-full w-full cursor-pointer object-cover" : "h-full w-full cursor-pointer object-contain"}
              src={e.src}
              alt="zoomImage"
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL={e.src}
            />
          ))}
        </Carousel>
      </div>
    </ModalBody>
  </Modal>;
}

export default ZoomView;
