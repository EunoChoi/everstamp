'use client';

import IsMobile from "@/function/IsMobile";
import IntroMobile from "@/component/intro/IntroMobile";
import IntroDesktop from "@/component/intro/IntroDesktop";

/**
 * [Client] intro page , url : 'everstamp.site/'
 */
const Page = () => {
  const isMobile = IsMobile();


  if (isMobile == null) return <></>;
  else if (isMobile === true) return <IntroMobile />;
  else return <IntroDesktop />;
}

export default Page;