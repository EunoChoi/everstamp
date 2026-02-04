'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const MODAL_PARAM = 'modal';

export type ModalFilterKey = 'year-filter' | 'month-filter' | 'emotion-filter';

export function useModalParam(modalKey: ModalFilterKey) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get(MODAL_PARAM) === modalKey;

  const open = () => {
    const params = new URLSearchParams(searchParams);
    params.set(MODAL_PARAM, modalKey);
    router.push(`${pathname}?${params.toString()}`);
  };

  const close = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(MODAL_PARAM);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return { isOpen, open, close };
}
