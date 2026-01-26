// src/providers/SettingsProvider.tsx
'use client';

import { useCurrentUserEmail } from '@/common/hooks/useCurrentUserEmail';
import { useLocalStorage } from '@/common/hooks/useLocalStorage';
import { LocalUserStorage } from '@/common/types';
import { ReactNode, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { FONT_SIZE_LIST, FONT_TYPE_LIST, SettingsContext, THEME_BG_COLORS, THEME_COLORS, FontType } from './SettingsContext';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { currentUserEmail } = useCurrentUserEmail();

  const { storedValue: settings, setValue: setSettings } = useLocalStorage<LocalUserStorage>(currentUserEmail, {});
  const fontSize = settings?.fontSize ?? FONT_SIZE_LIST[1];
  const fontType = settings?.fontType ?? FONT_TYPE_LIST[0]; // 기본: type1
  const themeColor = settings?.themeColor ?? THEME_COLORS[0]; // 기본: 파란색

  const setFontSize = (size: string) => {
    if (FONT_SIZE_LIST.includes(size)) {
      setSettings((prev) => ({ ...prev, fontSize: size }));
    }
  };

  const setFontType = (type: FontType) => {
    if (FONT_TYPE_LIST.includes(type)) {
      setSettings((prev) => ({ ...prev, fontType: type }));
    }
  };

  const setThemeColor = (color: string) => {
    if (THEME_COLORS.includes(color)) {
      setSettings((prev) => ({ ...prev, themeColor: color }));
    }
  };

  // 배경색 + 모바일 상태바 색상 동기화
  useEffect(() => {
    const bgColor = THEME_BG_COLORS[themeColor] || '#f3f7fc';
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.setProperty('--theme-bg', bgColor);

    // 모바일 상태바 색상
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', bgColor);
  }, [themeColor]);

  // 폰트 타입에 따라 전역 폰트 적용
  useEffect(() => {
    const currentFontType = settings?.fontType ?? FONT_TYPE_LIST[0];
    // 모든 폰트 타입 클래스 제거
    document.body.classList.remove('font-type2', 'font-type3');
    
    if (currentFontType === 'type2') {
      // 타입2: 모든 폰트를 배민주아체로
      document.body.classList.add('font-type2');
    } else if (currentFontType === 'type3') {
      // 타입3: 모든 폰트를 Pretendard로
      document.body.classList.add('font-type3');
    }
    // 타입1: 기본 (타이틀은 배민주아체, 나머지는 학교 안심체) - 클래스 없음
  }, [settings?.fontType]);

  const theme = useMemo(() => ({
    themeColor: themeColor,
    fontSize: fontSize
  }), [themeColor, fontSize]);


  const value = useMemo(() => ({
    fontSize,
    fontType,
    themeColor,
    setFontSize,
    setFontType,
    setThemeColor,
  }), [fontSize, fontType, themeColor, setFontSize, setFontType, setThemeColor]);

  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider >
  );
}