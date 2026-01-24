'use client';

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

// 페이지 전환해도 값 유지하려고 전역으로 저장
let lastKnownValue: boolean | null = null;

const IsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(lastKnownValue);

  const mode = useMediaQuery({
    query: "(max-width: 1024px)"
  });

  useEffect(() => {
    lastKnownValue = mode;
    setIsMobile(mode);
  }, [mode])

  return isMobile;
};

export default IsMobile;