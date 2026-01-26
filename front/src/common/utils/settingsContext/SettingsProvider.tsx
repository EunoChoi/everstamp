// src/providers/SettingsProvider.tsx
'use client';

import { useCurrentUserEmail } from '@/common/hooks/useCurrentUserEmail';
import { useLocalStorage } from '@/common/hooks/useLocalStorage';
import { LocalUserStorage } from '@/common/types';
import { ReactNode, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { FONT_SIZE_LIST, SettingsContext, THEME_BG_COLORS, THEME_COLORS } from './SettingsContext';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { currentUserEmail } = useCurrentUserEmail();

  const { storedValue: settings, setValue: setSettings } = useLocalStorage<LocalUserStorage>(currentUserEmail, {});
  const fontSize = settings?.fontSize ?? FONT_SIZE_LIST[1];
  const themeColor = settings?.themeColor ?? THEME_COLORS[0]; // 기본: 파란색

  const setFontSize = (size: string) => {
    if (FONT_SIZE_LIST.includes(size)) {
      setSettings((prev) => ({ ...prev, fontSize: size }));
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

  const theme = useMemo(() => ({
    themeColor: themeColor,
    fontSize: fontSize
  }), [themeColor, fontSize]);


  const value = useMemo(() => ({
    fontSize,
    themeColor,
    setFontSize,
    setThemeColor,
  }), [fontSize, themeColor]);

  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider >
  );
}