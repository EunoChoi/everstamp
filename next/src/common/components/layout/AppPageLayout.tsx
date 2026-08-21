'use client';

import { ReactNode, RefObject } from "react";

import { ScrollContainer } from "../ui/ScrollContainer";
import TopButtons from "../ui/TopButtons/TopButtons";
import { PageContent, PageContentProps } from "./PageContent";

interface Props {
  afterContent?: ReactNode;
  children: ReactNode;
  contentProps?: PageContentProps;
  pageRef?: RefObject<HTMLDivElement>;
  showScrollToTop?: boolean;
  topButtons?: ReactNode;
}

const AppPageLayout = ({ afterContent, children, contentProps, pageRef, showScrollToTop = false, topButtons }: Props) => {
  return (
    <ScrollContainer
      ref={pageRef}
      className="flex h-[100dvh] flex-col items-center justify-start border-none outline-none"
      contentClassName="flex min-h-full flex-col items-center justify-start"
      fadeSizeClassName="h-[70px]"
      scrollAreaClassName="flex h-full w-full flex-col items-center justify-start"
      showScrollFade
      showScrollToTop={showScrollToTop}
    >
      {topButtons && (
        <TopButtons>
          {topButtons}
        </TopButtons>
      )}

      <PageContent {...contentProps}>
        {children}
      </PageContent>

      {afterContent}
    </ScrollContainer>
  );
};

export default AppPageLayout;
