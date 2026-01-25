'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

interface ScrollContextType {
  scrollTop: number;
  scrolled: boolean;
}

const ScrollContext = createContext<ScrollContextType>({ scrollTop: 0, scrolled: false });

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [container, setContainer] = useState<Element | null>(null);

  // 컨테이너 찾기 (DOM 준비될 때까지 재시도)
  useEffect(() => {
    const findContainer = () => {
      const el = document.querySelector('[data-scroll-container]');
      if (el) {
        setContainer(el);
        return true;
      }
      return false;
    };

    if (findContainer()) return;

    // 컨테이너를 못 찾으면 100ms마다 재시도 (최대 2초)
    let attempts = 0;
    const interval = setInterval(() => {
      if (findContainer() || attempts++ > 20) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    if (!container) return;

    const handleScroll = () => setScrollTop(container.scrollTop);
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // 초기값 설정
    handleScroll();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [container]);

  return (
    <ScrollContext.Provider value={{ scrollTop, scrolled: scrollTop > 10 }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
