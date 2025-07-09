// src/providers/SettingsProvider.tsx
'use client';

import { useCurrentUserEmail } from '@/common/hooks/useCurrentUserEmail';
import { useLocalStorage } from '@/common/hooks/useLocalStorage';
import { LocalUserStorage } from '@/common/types';
import { ReactNode, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { FONT_SIZE_LIST, SettingsContext, THEME_COLORS } from './SettingsContext';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { currentUserEmail } = useCurrentUserEmail();

  const { storedValue: settings, setValue: setSettings } = useLocalStorage<LocalUserStorage>(currentUserEmail, {});
  const fontSize = settings?.fontSize ?? FONT_SIZE_LIST[1];
  const themeColor = settings?.themeColor ?? THEME_COLORS[0];

  //이 부분 로직 수정 필요 
  const changeFontSize = (type: 'Up' | 'Down') => {
    const currentIndex = FONT_SIZE_LIST.findIndex((v) => v === settings.fontSize);
    let nextIndex = type === 'Up' ? (currentIndex + 1) : (currentIndex - 1);

    if (nextIndex >= FONT_SIZE_LIST.length) {
      nextIndex = FONT_SIZE_LIST.length - 1;
    }
    else if (nextIndex < 0) {
      nextIndex = 0;
    }

    const nextFontSize = FONT_SIZE_LIST[nextIndex];
    setSettings((prev) => ({ ...prev, fontSize: nextFontSize }));
  };
  const fontSizeUp = () => changeFontSize('Up');
  const fontSizeDown = () => changeFontSize('Down');

  const setThemeColor = (color: string) => {
    if (THEME_COLORS.includes(color)) {
      setSettings((prev) => ({ ...prev, themeColor: color }));
    }
  };

  const theme = useMemo(() => ({
    themeColor: themeColor,
    fontSize: fontSize
  }), [themeColor, fontSize]);


  const value = useMemo(() => ({
    fontSize,
    themeColor,
    fontSizeUp,
    fontSizeDown,
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