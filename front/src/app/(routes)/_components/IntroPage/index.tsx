'use client';

import IsMobile from "@/common/functions/IsMobile";
import IntroDesktop from "./IntroDesktop";
import IntroMobile from "./IntroMobile";

const IntroPage = () => {
  const isMobile = IsMobile();


  if (isMobile == null) return <></>;
  else if (isMobile === true) return <IntroMobile />;
  else return <IntroDesktop />;
}

export default IntroPage;