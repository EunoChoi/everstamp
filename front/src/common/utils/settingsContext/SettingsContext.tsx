import { createContext } from 'react';

export const FONT_SIZE_LIST = ['13px', '14px', '15px', '16px', '17px'];
export const THEME_COLORS = ['#83c6b6', '#979FC7', '#8CADE2', '#eda5b1', '#f9c74f', '#8f8f8f'];
export const THEME_COLORS_NAME = ['green', 'purple', 'blue', 'pink', 'yellow', 'grey'];
// 배경색
export const THEME_BG_COLORS: Record<string, string> = {
  '#979FC7': '#f5f5fa',
  '#8CADE2': '#f3f7fc',
  '#83c6b6': '#f2faf8',
  '#eda5b1': '#fef9fa',
  '#f9c74f': '#fefcf4',
  '#8f8f8f': '#f7f7f7',
};

interface SettingsContextType {
  fontSize: string;
  themeColor: string;
  setFontSize: (size: string) => void;
  setThemeColor: (color: string) => void;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);