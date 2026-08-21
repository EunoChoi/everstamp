'use client';

import { ComponentProps } from 'react';

import { ModalShell } from './ModalShell';

type QueryModalProps = ComponentProps<typeof ModalShell>;

export const QueryModal = (props: QueryModalProps) => {
  return <ModalShell {...props} />;
};
