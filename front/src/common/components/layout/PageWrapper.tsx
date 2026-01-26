'use client'
import { forwardRef } from "react";
import styled from "styled-components";
import { useScroll } from "@/common/hooks/useScrollContext";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(({ children, className }, ref) => {
  const { scrolled } = useScroll();

  return (
    <Wrapper ref={ref} className={className} data-scroll-container>
      <TopGradient className={scrolled ? 'visible' : ''} />
      {children}
      <BottomGradient />
    </Wrapper>
  );
});

PageWrapper.displayName = 'PageWrapper';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;

  border: none;
  outline: none;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  overflow-y: scroll;

  animation: pageIn 0.4s ease-out;

  @keyframes pageIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TopGradient = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 0;
  z-index: 90;
  pointer-events: none;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    
    background: linear-gradient(
      to bottom,
      var(--theme-bg, #f5f5fa) 0%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
      transparent 100%
    );
    
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.visible::after {
    opacity: 1;
  }
`;

const BottomGradient = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 0;
  z-index: 90;
  pointer-events: none;
  flex-shrink: 0;
  margin-top: auto;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    
    background: linear-gradient(
      to top,
      var(--theme-bg, #f5f5fa) 0%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 40%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 70%,
      transparent 100%
    );
  }

  @media (max-width: 479px) {
    &::after {
      height: 120px;
    }
  }
`;