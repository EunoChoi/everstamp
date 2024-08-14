'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NetworkStatus = () => {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateNetworkStatus = () => {
      if (!navigator.onLine) {
        router.push('/offline');
      }
      // setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    updateNetworkStatus();

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);


  return (
    <>
      {/* {isOnline ? <></> : <div>off</div>} */}
    </>
  );
};

export default NetworkStatus;