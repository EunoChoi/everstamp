'use client';

import Image from "next/image";
import styled, { keyframes } from "styled-components";
import emotionsImage from '/public/img/emotion/emotions.png';

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

const LoadingScreen = ({ message, showLogo = true }: LoadingScreenProps) => (
  <Wrapper>
    {showLogo && (
      <LogoWrapper>
        <EmotionImageWrapper>
          <Image
            src={emotionsImage}
            alt="emotions"
            width={1200}
            height={900}
            priority
            quality={100}
            unoptimized={false}
          />
        </EmotionImageWrapper>
        <Logo>TO:OK</Logo>
        <Dots>
          <Dot $delay={0} />
          <Dot $delay={0.2} />
          <Dot $delay={0.4} />
        </Dots>
      </LogoWrapper>
    )}
    {message && <Message>{message}</Message>}
  </Wrapper>
);

export default LoadingScreen;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: var(--theme-bg, #f3f7fc);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const EmotionImageWrapper = styled.div`
  width: 60%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    filter: brightness(1.1);
  }

  @media (max-width: 479px) {
    width: 50%;
    max-width: 200px;
  }

  @media (min-width: 480px) and (max-width: 1024px) {
    width: 55%;
    max-width: 250px;
  }

  @media (min-width: 1025px) {
    width: 65%;
    max-width: 350px;
  }
`;

const Logo = styled.span`
  font-family: 'BMJUA';
  font-size: 48px;
  color: rgb(var(--greyTitle));
  
  &::first-letter {
    color: #8CADE2;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div<{ $delay: number }>`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: #8CADE2;
  animation: ${pulse} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const Message = styled.span`
  font-size: 14px;
  color: rgb(150, 150, 150);
  animation: ${fadeIn} 0.6s ease-out 0.3s both;
`;
