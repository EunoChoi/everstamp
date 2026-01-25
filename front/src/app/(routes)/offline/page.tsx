'use client'
import { useRouter } from 'next/navigation';
import { MdSignalWifiConnectedNoInternet4 } from 'react-icons/md';
import { useEffect } from "react";
import styled from "styled-components";

/**
 * [Client] offline page
 */
export default function OfflinePage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onOnline = () => {
      router.push('/');
    }

    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('online', onOnline);
    };
  }, [])

  return (
    <Wrapper>
      <MdSignalWifiConnectedNoInternet4 className="icon" />
      <span className="title">오프라인</span>
      <p>인터넷 연결 상태를 확인해주세요.</p>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  color: #3f3f3f;
  width: 100%;
  height: 95dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  *{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  
  .icon{
    font-size: 96px;
  }
  .title{
    font-size: 36px;
    /* font-weight: 500; */
    margin: 32px 0;
  }
  p{
    width: 80%;
    font-size: 18px;
    color: #525252;
    text-align: center;
  }
`
