'use client'

import { useCustomRouter } from '@/function/customRouter';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const NetworkStatus = () => {
  const router = useCustomRouter();


  useEffect(() => {
    if (typeof window === 'undefined') return;
    // console.log(window.navigator.userAgent);

    const onOnline = () => {
      // if (navigator.onLine && window.location.pathname === '/offline') {
      //   router.push('/app');
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