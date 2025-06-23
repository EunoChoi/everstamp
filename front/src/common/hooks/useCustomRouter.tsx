'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import { useCallback, useEffect } from "react";

let timerId: NodeJS.Timeout | null = null;
const getTimerId = () => timerId;
const setTimerId = (id: NodeJS.Timeout) => { timerId = id; };


const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loadingDelay = 700; //ms

  nProgress.configure({
    showSpinner: false,
    easing: 'ease',
    speed: 500,
    minimum: 0.3
  });

  useEffect(() => {
    const currentTimerId = getTimerId();
    if (currentTimerId) {
      clearTimeout(currentTimerId);
    }
    nProgress.done();
  }, [pathname, searchParams]);


  const push = useCallback((url: string, options?: object) => {
    const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    if (currentPath === url) { // 같은 URL로 이동 시
      router.refresh();
    } else {
      const tempTimerId = setTimeout(() => {
        nProgress.start();
      }, loadingDelay);
      setTimerId(tempTimerId);
      router.push(url, options);
    }
  }, [router, pathname, searchParams]);

  const { back, refresh, prefetch } = router;

  return { push, back, refresh, prefetch };
};

export default useCustomRouter;