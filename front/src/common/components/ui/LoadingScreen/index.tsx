'use client';

import Image from "next/image";
import styled from "styled-components";
import { EMOTIONS } from "@/common/constants/emotions";

interface LoadingScreenProps {
  message?: string;
  showImage?: boolean;
}

// 로딩 화면 공통 컴포넌트
const LoadingScreen = ({ message = "loading...", showImage = true }: LoadingScreenProps) => (
  <Wrapper>
    {showImage && <Image src={EMOTIONS[2].src} alt={EMOTIONS[2].name} width={128} height={128} />}
    {message && <span>{message}</span>}
  </Wrapper>
);

export default LoadingScreen;

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: var(--theme-bg, #f5f5fa);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  
  span {
    font-size: 24px;
    text-transform: uppercase;
    color: rgb(88, 88, 88);
  }
`;
