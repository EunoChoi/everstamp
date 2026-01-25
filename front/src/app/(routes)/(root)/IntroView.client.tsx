'use client';

import IsMobile from '@/common/functions/IsMobile';
import IntroDesktop from './_components/IntroDesktop';
import IntroMobile from './_components/IntroMobile';

const IntroView = () => {
  const isMobile = IsMobile();

  if (isMobile == null) return <></>;
  else if (isMobile === true) return <IntroMobile />;
  else return <IntroDesktop />;
};

export default IntroView;
