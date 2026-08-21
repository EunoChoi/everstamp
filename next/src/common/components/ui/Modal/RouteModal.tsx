'use client';

import { cn } from "@/common/utils/cn";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";
import { ModalShell } from "./ModalShell";

interface Props {
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}

const modalContentClass = "flex h-full w-full flex-col overflow-hidden rounded-none bg-theme-bg transition-all duration-200 ease-in-out";
const modalDesktopClass = "desktop:h-[85dvh] desktop:max-h-[85%] desktop:w-[500px] desktop:rounded-theme desktop:shadow-theme-modal";

export const RouteModal = ({ ariaLabel, className, children }: Props) => {
  const router = useRouter();
  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ModalShell
      ariaLabel={ariaLabel}
      isOpen
      onClose={closeModal}
      overlayClassName="z-[99999] flex items-center justify-center"
      className={cn(
        modalContentClass,
        modalDesktopClass,
        className,
      )}
    >
      {children}
    </ModalShell>
  );
};
