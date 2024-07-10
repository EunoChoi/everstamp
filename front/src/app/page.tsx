'use client';

import IsMobile from "@/function/IsMobile";
import IntroMobile from "@/component/IntroMobile";
import IntroDesktop from "@/component/IntroDesktop";


const Page = () => {
  const isMobile = IsMobile();

  if (isMobile == null) return <></>;
  else if (isMobile === true) return <IntroMobile />;
  else return <IntroDesktop />
}

export default Page;