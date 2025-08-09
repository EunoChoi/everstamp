'use client';

import { useRef } from "react";
import styled from "styled-components";

import ListFilter from "@/app/(routes)/app/(withLayout)/list/_components/ListFilter";
import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import ScrollToTopButton from "@/common/components/ui/ScrollToTopButton";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { DiaryWithRelations } from "@/server/types";
import { AnimatePresence, motion } from "framer-motion";
import { Diaries } from "./_components/Diaries";
import ListTopButtons from "./_components/ListTopButtons";
import NoDiaries from "./_components/NoDiaries";
import { useInfiniteDiaries } from "./_hooks/useInfiniteDiaries";
import { LIST_QUERY_SORT } from "./_hooks/useListFilter";

export interface ListFilterState {
  sort: LIST_QUERY_SORT;
  year: number;
  month?: number;
  yearAndMonth?: string;
  emotion?: number;
  open: boolean;
}
interface ListViewProps {
  initialDiaries: DiaryWithRelations[];
  filterState: ListFilterState
}

const ListView = ({ initialDiaries, filterState }: ListViewProps) => {
  usePrefetchPage();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { diaries, hasMore, loaderRef } = useInfiniteDiaries({ initialDiaries, filterState });
  const noDiaries = !hasMore && diaries.length === 0;

  return (
    <PageWrapper ref={wrapperRef}>
      <ListTopButtons filterState={filterState} />
      <AnimatePresence mode="wait">
        {filterState.open && <ListFilter filterState={filterState} />}
      </AnimatePresence>
      <ListContentWrapper>
        <Diaries diaries={diaries} />
        {noDiaries && <NoDiaries />}
        {hasMore && <InViewBox ref={loaderRef} />}
      </ListContentWrapper>
      <ScrollToTopButton contentRef={wrapperRef} />
    </PageWrapper>
  );
}

export default ListView;

const InViewBox = styled(motion.div)`
  width: 100%;
  height: 128px;
`
const ListContentWrapper = styled(ContentWrapper)`
  max-width: 600px;
  flex-grow: 1;
`