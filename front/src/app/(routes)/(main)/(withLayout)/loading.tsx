'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { EMOTIONS } from "@/common/constants/emotions";

// 500ms 넘게 걸리면 로딩 표시 (바로 뜨면 깜빡여서 더 느려보임)
export default function Loading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        width: '100dvw',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        backgroundColor: 'var(--theme-bg, #f5f5fa)',
      }}
    >
      <Image src={EMOTIONS[2].src} alt={EMOTIONS[2].name} width={128} height={128} priority />
      <span
        style={{
          fontSize: '24px',
          textTransform: 'uppercase',
          color: 'rgb(88, 88, 88)',
        }}
      >
        loading...
      </span>
    </div>
  );
}
