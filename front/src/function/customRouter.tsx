import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import nProgress from "nprogress";

import { getTimerId, setTimerId } from "./timerId";


const CustomRouter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('custom router')
    const timer = getTimerId();
    if (timer) {
      clearTimeout(timer);
    }
    nProgress.done();
  }, [pathname, searchParams]);
}

const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const loadingDelay = 1000; //ms

  nProgress.configure({
    showSpinner: true,
    easing: 'ease',
    speed: 500,
    minimum: 0.3
  });

  const back = router.back;
  const refresh = router.refresh;
  const prefetch = router.prefetch;

  const push = useCallback((url: string, options?: object) => {
    // console.log(pathname, url)
    if (pathname === url) { //same url
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
  }, [router, pathname]);

  return { push, back, refresh, prefetch };
};


export { useCustomRouter, CustomRouter };

export default {
  useCustomRouter,
  CustomRouter
};