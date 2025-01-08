'use client';

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const IsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const mode = useMediaQuery({
    query: "(max-width: 1024px)"
  });

  useEffect(() => {
    setIsMobile(mode);
  }, [mode])

  return isMobile
};

export default IsMobile;