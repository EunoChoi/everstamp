'use client';

import useIsMobile from '@/common/functions/useIsMobile';
import { ScrollContainer } from '@/common/components/ui/ScrollContainer';
import DesktopIntroView from './_components/DesktopIntroView';
import MobileIntroView from './_components/MobileIntroView';

const IntroView = () => {
  const isMobile = useIsMobile();

  return (
    <ScrollContainer
      className="h-[100dvh] w-[100dvw] bg-theme-bg"
      showScrollFade
      showScrollToTop
    >
      {isMobile === false ? <DesktopIntroView /> : <MobileIntroView />}
    </ScrollContainer>
  );
};

export default IntroView;
