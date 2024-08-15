'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const NetworkStatus = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onOnline = () => {
      if (navigator.onLine && window.location.pathname === '/offline') {
        router.push('/app');
      }
    };

    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('online', onOnline);
    };
  }, []);


  return null;
};

export default NetworkStatus;