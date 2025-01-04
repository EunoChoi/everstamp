'use client';
import { useEffect } from "react";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDiary } from "@/common/fetchers/diary";

import IsMobile from "@/common/functions/IsMobile";
import DesktopZoomModal from "./DesktopZoomModal";
import MobileZoomModal from "./MobileZoomModal";

interface Props {
  diaryId: string;
}

const ZoomModal = ({ diaryId }: Props) => {
  const { data: diaryData, isError } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiary({ id: diaryId }),
    enabled: diaryId !== null
  });

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  const isMobile = IsMobile();

  if (isMobile === undefined || isMobile === null) return <></>;
  else if (isMobile) return <MobileZoomModal diaryData={diaryData} />;
  else return <DesktopZoomModal diaryData={diaryData} />;
}

export default ZoomModal;
