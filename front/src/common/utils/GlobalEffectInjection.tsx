import { useAutoCloseSnackbar } from "../hooks/useAutoCloseSnackbar";

export const GlobalEffectInjection = () => {
  useAutoCloseSnackbar();
  return null;
}