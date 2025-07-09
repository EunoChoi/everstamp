import { createContext } from 'react';

export const FONT_SIZE_LIST = ['14px', '15px', '16px'];
export const THEME_COLORS = ['#979FC7', '#8CADE2', '#83c6b6', '#eda5b1', '#8f8f8f'];
export const THEME_COLORS_NAME = ['purple', 'blue', 'green', 'pink', 'grey'];

interface SettingsContextType {
  fontSize: string;
  themeColor: string;
  fontSizeUp: () => void;
  fontSizeDown: () => void;
  setThemeColor: (color: string) => void;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);