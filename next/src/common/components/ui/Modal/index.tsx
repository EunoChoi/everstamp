'use client';

import { cn } from '@/common/utils/cn';
import { ReactNode, useEffect, useRef } from 'react';

export type ModalVariant = 'top' | 'bottom' | 'center' | 'full';

export interface ResponsiveModalVariant {
  base: ModalVariant;
  tablet: ModalVariant;
  desktop: ModalVariant;
}

interface ModalProps {
  ariaLabel: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  variant: ResponsiveModalVariant;
  contentClassName?: string;
  overlayClassName?: string;
  dismissible?: boolean;
}

const overlayClass = 'fixed left-0 top-0 flex h-[100dvh] w-[100dvw] bg-theme-overlay/5 backdrop-blur-xl transition-[opacity,visibility] duration-200 ease-in-out';
const contentClass = 'overflow-hidden bg-theme-bg transition-[opacity,transform] duration-200 ease-in-out';

const baseOverlayVariantClass: Record<ModalVariant, string> = {
  top: 'items-start justify-center',
  bottom: 'items-end justify-center',
  center: 'items-center justify-center',
  full: 'items-stretch justify-stretch',
};

const tabletOverlayVariantClass: Record<ModalVariant, string> = {
  top: 'tablet:items-start tablet:justify-center',
  bottom: 'tablet:items-end tablet:justify-center',
  center: 'tablet:items-center tablet:justify-center',
  full: 'tablet:items-stretch tablet:justify-stretch',
};

const desktopOverlayVariantClass: Record<ModalVariant, string> = {
  top: 'desktop:items-start desktop:justify-center',
  bottom: 'desktop:items-end desktop:justify-center',
  center: 'desktop:items-center desktop:justify-center',
  full: 'desktop:items-stretch desktop:justify-stretch',
};

const baseContentVariantClass: Record<ModalVariant, string> = {
  top: 'h-auto w-full origin-top rounded-b-3xl shadow-theme-panel-mobile',
  bottom: 'h-auto w-full origin-bottom rounded-t-3xl shadow-theme-panel-mobile',
  center: 'origin-center rounded-theme shadow-theme-panel',
  full: 'h-full w-full origin-center rounded-none',
};

const tabletContentVariantClass: Record<ModalVariant, string> = {
  top: 'tablet:h-auto tablet:w-full tablet:origin-top tablet:rounded-b-3xl tablet:shadow-theme-panel-mobile',
  bottom: 'tablet:h-auto tablet:w-full tablet:origin-bottom tablet:rounded-t-3xl tablet:shadow-theme-panel-mobile',
  center: 'tablet:origin-center tablet:rounded-theme tablet:shadow-theme-panel',
  full: 'tablet:h-full tablet:w-full tablet:origin-center tablet:rounded-none tablet:shadow-none',
};

const desktopContentVariantClass: Record<ModalVariant, string> = {
  top: 'desktop:h-auto desktop:w-full desktop:origin-top desktop:rounded-b-3xl desktop:shadow-theme-panel-mobile',
  bottom: 'desktop:h-auto desktop:w-full desktop:origin-bottom desktop:rounded-t-3xl desktop:shadow-theme-panel-mobile',
  center: 'desktop:origin-center desktop:rounded-theme desktop:shadow-theme-modal',
  full: 'desktop:h-full desktop:w-full desktop:origin-center desktop:rounded-none desktop:shadow-none',
};

const baseOpenVariantClass: Record<ModalVariant, string> = {
  top: 'scale-y-100 opacity-100',
  bottom: 'translate-y-0 opacity-100',
  center: 'scale-100 opacity-100',
  full: 'opacity-100',
};

const baseClosedVariantClass: Record<ModalVariant, string> = {
  top: 'scale-y-0 opacity-100',
  bottom: 'translate-y-full opacity-100',
  center: 'scale-95 opacity-0',
  full: 'opacity-0',
};

const tabletOpenVariantClass: Record<ModalVariant, string> = {
  top: 'tablet:scale-y-100 tablet:translate-y-0 tablet:opacity-100',
  bottom: 'tablet:scale-y-100 tablet:translate-y-0 tablet:opacity-100',
  center: 'tablet:scale-100 tablet:translate-y-0 tablet:opacity-100',
  full: 'tablet:scale-100 tablet:translate-y-0 tablet:opacity-100',
};

const tabletClosedVariantClass: Record<ModalVariant, string> = {
  top: 'tablet:scale-y-0 tablet:translate-y-0 tablet:opacity-100',
  bottom: 'tablet:scale-y-100 tablet:translate-y-full tablet:opacity-100',
  center: 'tablet:scale-95 tablet:translate-y-0 tablet:opacity-0',
  full: 'tablet:scale-100 tablet:translate-y-0 tablet:opacity-0',
};

const desktopOpenVariantClass: Record<ModalVariant, string> = {
  top: 'desktop:scale-y-100 desktop:translate-y-0 desktop:opacity-100',
  bottom: 'desktop:scale-y-100 desktop:translate-y-0 desktop:opacity-100',
  center: 'desktop:scale-100 desktop:translate-y-0 desktop:opacity-100',
  full: 'desktop:scale-100 desktop:translate-y-0 desktop:opacity-100',
};

const desktopClosedVariantClass: Record<ModalVariant, string> = {
  top: 'desktop:scale-y-0 desktop:translate-y-0 desktop:opacity-100',
  bottom: 'desktop:scale-y-100 desktop:translate-y-full desktop:opacity-100',
  center: 'desktop:scale-95 desktop:translate-y-0 desktop:opacity-0',
  full: 'desktop:scale-100 desktop:translate-y-0 desktop:opacity-0',
};

export const Modal = ({
  ariaLabel,
  children,
  isOpen,
  onClose,
  variant,
  contentClassName,
  overlayClassName,
  dismissible = true,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocusedElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const modalElement = modalRef.current;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const focusModal = window.requestAnimationFrame(() => {
      const firstFocusableElement = modalElement?.querySelector<HTMLElement>(focusableSelector);
      (firstFocusableElement ?? modalElement)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dismissible) {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !modalElement) return;

      const focusableElements = Array.from(
        modalElement.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        modalElement.focus();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstFocusableElement || activeElement === modalElement)) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      } else if (!modalElement.contains(activeElement)) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusModal);
      document.removeEventListener('keydown', handleKeyDown);

      if (previouslyFocusedElement?.isConnected) {
        previouslyFocusedElement.focus();
      }
    };
  }, [dismissible, isOpen]);

  return (
    <div
      className={cn(
        overlayClass,
        baseOverlayVariantClass[variant.base],
        tabletOverlayVariantClass[variant.tablet],
        desktopOverlayVariantClass[variant.desktop],
        isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        overlayClassName,
      )}
      onClick={() => {
        if (dismissible) onClose();
      }}
    >
      <div
        ref={modalRef}
        aria-hidden={!isOpen}
        aria-label={ariaLabel}
        aria-modal="true"
        className={cn(
          contentClass,
          baseContentVariantClass[variant.base],
          tabletContentVariantClass[variant.tablet],
          desktopContentVariantClass[variant.desktop],
          isOpen
            ? baseOpenVariantClass[variant.base]
            : baseClosedVariantClass[variant.base],
          isOpen
            ? tabletOpenVariantClass[variant.tablet]
            : tabletClosedVariantClass[variant.tablet],
          isOpen
            ? desktopOpenVariantClass[variant.desktop]
            : desktopClosedVariantClass[variant.desktop],
          contentClassName,
        )}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
};
