'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { EMOTIONS } from "@/common/constants/emotions";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// 에러 발생 시 보여줄 페이지 (Error Boundary)
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div
      style={{
        width: '100dvw',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: 'var(--theme-bg, #f5f5fa)',
        color: 'rgb(88, 88, 88)',
      }}
    >
      <Image src={EMOTIONS[1].src} alt={EMOTIONS[1].nameKr} width={128} height={128} priority />
      <h2 style={{ fontSize: '24px', margin: '16px 0 8px' }}>
        문제가 발생했습니다
      </h2>
      <p style={{ fontSize: '16px', color: '#525252', textAlign: 'center', padding: '0 20px' }}>
        일시적인 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button
          onClick={reset}
          style={{
            padding: '10px 24px',
            fontSize: '16px',
            borderRadius: '24px',
            border: 'none',
            backgroundColor: 'rgb(88, 88, 88)',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          다시 시도
        </button>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '10px 24px',
            fontSize: '16px',
            borderRadius: '24px',
            border: '1px solid rgb(88, 88, 88)',
            backgroundColor: 'white',
            color: 'rgb(88, 88, 88)',
            cursor: 'pointer',
          }}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
