import type { ReactNode } from 'react';

import { ScrollContainer } from '@/common/components/ui/ScrollContainer';

interface Props {
  children: ReactNode;
}

const docMainClass = 'mx-auto flex w-full max-w-[720px] flex-col gap-4 px-5 py-10 font-paperozi tablet:px-8 tablet:py-14';

const DocLayout = ({ children }: Props) => {
  return (
    <ScrollContainer
      className="h-[100dvh] w-[100dvw] bg-theme-bg"
      showScrollFade
      showScrollToTop
    >
      <main className={docMainClass}>{children}</main>
    </ScrollContainer>
  );
};

export default DocLayout;
