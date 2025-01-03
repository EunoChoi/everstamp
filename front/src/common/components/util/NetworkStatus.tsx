'use client'

import useCustomRouter from '@/common/hooks/useCustomRouter';
import { useEffect } from 'react';


const NetworkStatus = () => {
  const router = useCustomRouter();


  useEffect(() => {
    if (typeof window === 'undefined') return;
    // console.log(window.navigator.userAgent);

    const onOnline = () => {
      // if (navigator.onLine && window.location.pathname === '/offline') {
      //   router.push('/main');
      // }
    };

    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('online', onOnline);
    };
  }, []);


  return null;
};

export default NetworkStatus;