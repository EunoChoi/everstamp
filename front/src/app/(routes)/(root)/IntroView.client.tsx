'use client';

import useIsMobile from '@/common/functions/useIsMobile';
import IntroDesktop from './_components/IntroDesktop';
import IntroMobile from './_components/IntroMobile';

const IntroView = () => {
  const isMobile = useIsMobile();

  if (isMobile == null) return <></>;
  else if (isMobile === true) return <IntroMobile />;
  else return <IntroDesktop />;
};

export default IntroView;
