import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import nProgress from "nprogress";

const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [targetUrl, setTargetUrl] = useState('');

  nProgress.configure({
    showSpinner: false,
    easing: 'ease',
    speed: 500,
    minimum: 0.3
  });

  useEffect(() => {
    // console.log(pathname, targetUrl.split('?')[0])
    if (pathname === targetUrl.split('?')[0]) {
      nProgress.done();
      setTargetUrl('');
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, [pathname, searchParams, targetUrl]);

  const push = useCallback((url: string, options?: object) => {
    setTargetUrl(url);
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

  return { push };
};


export { useCustomRouter };
export default {
  useCustomRouter
};