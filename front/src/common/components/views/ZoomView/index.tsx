'use client';
import { getDiaryById } from "@/common/fetchers/diary";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect } from "react";

import IsMobile from "@/common/functions/IsMobile";
import { DesktopZoomView } from "./DesktopZoomView";
import { MobileZoomView } from "./MobileZoomView";


interface Props {
  diaryId: string;
}

export const ZoomView = ({ diaryId }: Props) => {
  const { data: diaryData, isError } = useQuery({
    queryKey: ['diary', 'id', diaryId],
    queryFn: () => getDiaryById({ id: diaryId }),
    enabled: diaryId !== null
  });

  useEffect(() => {
    if (isError) notFound();
  }, [isError])

  const isMobile = IsMobile();

  if (isMobile === undefined || isMobile === null) return <></>;
  else if (isMobile) return <MobileZoomView diaryData={diaryData} />;
  else return <DesktopZoomView diaryData={diaryData} />;
}