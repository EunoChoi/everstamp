'use client';

import { ReactNode } from "react";

import TopLoader from "../components/ui/TopLoader";
import { SettingsProvider } from "../settings/SettingsProvider";
import { TimezoneSync } from "../utils/TimezoneSync";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <SettingsProvider>
      <TimezoneSync />
      <TopLoader />
      {children}
    </SettingsProvider>
  );
};
