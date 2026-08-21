'use client';

import { cn } from '@/common/utils/cn';
import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';

import { Overlay } from '../Overlay';

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

const ModalCloseContext = createContext<(() => void) | null>(null);

export const useModalClose = () => useContext(ModalCloseContext);

export const ModalShell = ({
  isOpen,
  onClose,
  ariaLabel,
  children,
  className,
  overlayClassName,
  closeOnBackdrop = true,
  closeOnEscape = true,
}: ModalShellProps) => {
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
      if (event.key === 'Escape' && closeOnEscape) {
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
  }, [closeOnEscape, isOpen]);

  return (
    <Overlay
      isOpen={isOpen}
      onClose={() => {
        if (closeOnBackdrop) onClose();
      }}
      className={overlayClassName}
    >
      <ModalCloseContext.Provider value={onClose}>
        <div
          ref={modalRef}
          aria-hidden={!isOpen}
          aria-label={ariaLabel}
          aria-modal="true"
          className={cn(className)}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          tabIndex={-1}
        >
          {children}
        </div>
      </ModalCloseContext.Provider>
    </Overlay>
  );
};
