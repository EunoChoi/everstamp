import React, { useContext, useState, useEffect, ReactNode, createContext } from "react";


interface Props {
  children: ReactNode;
}

// 스크롤 컨텍스트 생성
const ScrollContext = createContext(0);

// 스크롤 프로바이더 컴포넌트
const ScrollProvider = ({ children }: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      console.log(window.scrollY)
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={scrollPosition}>
      {children}
    </ScrollContext.Provider>
  );
}

const useScroll = () => {
  return useContext(ScrollContext);
}

export { ScrollProvider, useScroll };