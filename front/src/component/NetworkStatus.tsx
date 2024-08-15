'use client'

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NetworkStatus = () => {
  const router = useRouter();
  const [beforeUrl, setBeforeUrl] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    console.log('online : ', navigator.onLine);
    if (!navigator.onLine) {
      router.push('/offline');
    }
  }, [pathname])

  useEffect(() => {
    if (typeof window === 'undefined') return;



    const onOnline = () => {
      if (beforeUrl !== '' && navigator.onLine) {
        console.log('on!');
        setBeforeUrl('');
        router.push(beforeUrl);
      }
    };
    const onOffline = () => {
      if (!navigator.onLine) {
        console.log('off!');
        setBeforeUrl(window.location.href);
        router.push('/offline');
      }
    }

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [beforeUrl]);


  return null;
};

export default NetworkStatus;