'use client';

import IntroDesktop from "@/common/components/IntroPage/IntroDesktop";
import IntroMobile from "@/common/components/IntroPage/IntroMobile";
import IsMobile from "@/common/function/IsMobile";


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