import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import nProgress from "nprogress";

const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  nProgress.configure({
    showSpinner: false,
    easing: 'ease',
    speed: 500,
    minimum: 0.3
  });

  useEffect(() => {
    nProgress.done();
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [pathname, searchParams]);

  const back = router.back;
  const refresh = router.refresh;
  const prefetch = router.prefetch;

  const push = useCallback((url: string, options?: object) => {
    if (pathname === url) { //same url
      router.refresh();
    }
    else {
      timerRef.current = setTimeout(() => {
        nProgress.start();
      }, 500);
      router.push(url, options);
    }
  }, [router, pathname]);

  return { push, back, refresh, prefetch };
};


export { useCustomRouter };
export default {
  useCustomRouter
};