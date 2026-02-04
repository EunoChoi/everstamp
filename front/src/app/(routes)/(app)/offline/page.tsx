'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import styled from 'styled-components';
import { MdSignalWifiConnectedNoInternet4 } from 'react-icons/md';

// 오프라인 페이지 (PWA)
// 온라인 복구되면 자동으로 홈 이동
export default function OfflinePage() {
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const onOnline = () => {
      router.push('/home');
    }

    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('online', onOnline);
    };
  }, [router])

  return (
    <Wrapper>
      <Icon>
        <MdSignalWifiConnectedNoInternet4 />
      </Icon>
      <Title>오프라인</Title>
      <Description>인터넷 연결 상태를 확인해주세요.</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: var(--theme-bg, #f5f5fa);
  color: rgb(88, 88, 88);
`;

const Icon = styled.div`
  font-size: 96px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1025px) {
    font-size: 128px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 16px 0 8px;
  text-align: center;

  @media (min-width: 1025px) {
    font-size: 32px;
  }
`;

const Description = styled.div`
  font-size: 16px;
  color: #525252;
  text-align: center;

  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;
