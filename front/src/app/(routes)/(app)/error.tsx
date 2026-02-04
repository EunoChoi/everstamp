'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// React Error Boundary
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <Wrapper>
      <Title>문제가 발생했습니다</Title>
      <Description>
        일시적인 오류가 발생했습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </Description>
      <ButtonGroup>
        <Button onClick={reset}>다시 시도</Button>
        <SecondaryButton onClick={() => window.location.href = '/home'}>
          홈으로
        </SecondaryButton>
      </ButtonGroup>
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
  padding: 0 20px;

  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 24px;
  border: none;
  background-color: rgb(88, 88, 88);
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 24px;
  border: 1px solid rgb(88, 88, 88);
  background-color: white;
  color: rgb(88, 88, 88);
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: 1025px) {
    font-size: 18px;
  }
`;
