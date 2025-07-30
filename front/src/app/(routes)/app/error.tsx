'use client';

import { emotions } from '@/common/images/emotions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("페이지 에러 발생:", error);
  }, [error]);

  return (
    <Wrapper>
      <Info>
        <Image src={emotions[3].src} alt='sad' width={128} height={128} />
        <span>Error</span>
        <p>{error.message}</p>
      </Info>

      <Button onClick={() => {
        router.push('/app');
      }}>
        go back
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  width: 100%;

  span{
    font-size: 48px;
    text-transform: uppercase;
  }
  p{
    width: 70%;
    font-size: 18px;
    text-align: center;

    text-wrap: balance;
    word-break: keep-all;
  }
`
const Button = styled.button`
  padding: 6px 24px;
  color: black;
  background-color: #A4CDFA;
  border-radius: 128px;
  font-size: 18px;
  text-transform: capitalize;
`