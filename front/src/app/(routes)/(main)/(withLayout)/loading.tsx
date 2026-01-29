'use client';

import LoadingScreen from '@/common/components/ui/LoadingScreen';
import { useEffect, useState } from 'react';

// 500ms 넘게 걸리면 로딩 표시 (바로 뜨면 깜빡여서 더 느려보임)
export default function Loading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return <LoadingScreen showLogo={true} />;
}
