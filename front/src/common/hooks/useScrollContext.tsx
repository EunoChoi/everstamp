'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ScrollContextType {
  scrollTop: number;
  scrolled: boolean;
}

const ScrollContext = createContext<ScrollContextType>({ scrollTop: 0, scrolled: false });

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const container = document.querySelector('[data-scroll-container]');
    if (!container) return;

    const handleScroll = () => setScrollTop(container.scrollTop);
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollTop, scrolled: scrollTop > 10 }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
