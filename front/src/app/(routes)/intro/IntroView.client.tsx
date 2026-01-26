'use client';

import { useEffect } from 'react';
import useIsMobile from '@/common/functions/useIsMobile';
import IntroDesktop from './_components/IntroDesktop';
import IntroMobile from './_components/IntroMobile';

const IntroView = () => {
  const isMobile = useIsMobile();

  // 인트로 페이지 배경색 + 상태바 색상 (파란색 테마 배경)
  useEffect(() => {
    const introBgColor = '#f3f7fc';
    document.body.style.backgroundColor = introBgColor;
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', introBgColor);
    }
  }, []);

  if (isMobile == null) return <></>;
  else if (isMobile === true) return <IntroMobile />;
  else return <IntroDesktop />;
};

export default IntroView;
