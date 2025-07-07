import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

interface DynamicThemeProviderProps {
  children: ReactNode;
}
const defaultTheme = {
  point: '#979FC7',
};

export const DynamicThemeProvider = ({ children }: DynamicThemeProviderProps) => {
  const { user } = useProtectedRoute();
  const theme = {
    point: user?.themeColor || defaultTheme.point,
  }

  return (<ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>);
}