'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { getTimerId, setTimerId } from "./timerId";
import nProgress from "nprogress";


const CustomRouter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = getTimerId();
    if (timer) {
      // console.log(timer)
      clearTimeout(timer);
    }
    nProgress.done();
  }, [pathname, searchParams]);
  return null;
}

const useCustomRouter = () => {
  const router = useRouter();
  const loadingDelay = 700; //ms

  nProgress.configure({
    showSpinner: false,
    easing: 'ease',
    speed: 500,
    minimum: 0.3
  });

  const back = router.back;
  const refresh = router.refresh;
  const prefetch = router.prefetch;
  const push = useCallback((url: string, options?: object) => {
    const pathAndQuery = window.location.pathname + window.location.search;
    // console.log('from : ', pathAndQuery)
    // console.log('to : ', url)
    if (pathAndQuery === url) { //same url
      // console.log('same url - refresh')
      router.refresh();
    }
    else {
      // nProgress.start();
      router.push(url, options);
      const tempTimerId = setTimeout(() => {
        nProgress.start();
      }, loadingDelay);
      setTimerId(tempTimerId);
    }
  }, [router]);

  return { push, back, refresh, prefetch };
};


export { useCustomRouter, CustomRouter };

export default {
  useCustomRouter,
  CustomRouter
};