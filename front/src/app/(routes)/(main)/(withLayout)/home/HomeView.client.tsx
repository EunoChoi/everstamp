'use client';

import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { useMemo, useState } from "react";
import styled from "styled-components";

import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import TopButtons from "@/common/components/ui/TopButtons";
import { getAvailableYears, getDiaryStats, getHabitStats } from "@/common/fetchers/stats";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";

import DiaryAnalysis from "./_components/DiaryAnalysis";
import EmotionStats from "./_components/EmotionStats";
import GreetingSection from "./_components/GreetingSection";
import HabitAnalysis from "./_components/HabitAnalysis";
import YearSelector from "./_components/YearSelector";

const HomeView = () => {
  usePrefetchPage();

  const currentYear = getYear(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isYearSelectorOpen, setYearSelectorOpen] = useState(false);

  const { data: availableYears } = useQuery({
    queryKey: ['stats', 'years'],
    queryFn: getAvailableYears,
    staleTime: 5 * 60 * 1000,
  });

  const { data: diaryStats, isLoading: isDiaryLoading } = useQuery({
    queryKey: ['stats', 'diary', selectedYear],
    queryFn: () => getDiaryStats({ year: selectedYear }),
    staleTime: 60 * 1000,
  });

  const { data: habitStats, isLoading: isHabitLoading } = useQuery({
    queryKey: ['stats', 'habit', selectedYear],
    queryFn: () => getHabitStats({ year: selectedYear }),
    staleTime: 60 * 1000,
  });

  const years = useMemo(() => {
    if (!availableYears || availableYears.length === 0) {
      return [currentYear];
    }
    const yearSet = new Set([...availableYears, currentYear]);
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [availableYears, currentYear]);

  const isLoading = isDiaryLoading || isHabitLoading;

  return (
    <PageWrapper>
      <TopButtons>
        <button
          className='auto'
          onClick={() => setYearSelectorOpen(true)}>
          <span>{selectedYear}년</span>
        </button>
      </TopButtons>

      <HomeContentWrapper>
        <GreetingSection
          year={selectedYear}
          totalDiaries={diaryStats?.totalCount ?? 0}
        />

        <DiaryAnalysis
          stats={diaryStats}
          year={selectedYear}
          isLoading={isLoading}
        />

        <EmotionStats
          emotionCounts={diaryStats?.emotionCounts ?? [0, 0, 0, 0, 0]}
          monthlyEmotionCounts={diaryStats?.monthlyEmotionCounts ?? Array(12).fill(null).map(() => [0, 0, 0, 0, 0])}
          isLoading={isLoading}
        />

        <HabitAnalysis
          stats={habitStats}
          isLoading={isLoading}
        />
      </HomeContentWrapper>

      <YearSelector
        isOpen={isYearSelectorOpen}
        onClose={() => setYearSelectorOpen(false)}
        years={years}
        selectedYear={selectedYear}
        onSelectYear={(year) => {
          setSelectedYear(year);
          setYearSelectorOpen(false);
        }}
      />
    </PageWrapper>
  );
};

export default HomeView;

const HomeContentWrapper = styled(ContentWrapper)`
  max-width: 600px;
  gap: 28px;
  padding-top: 8px;
  padding-bottom: 48px;

  @media (max-width: 479px) {
    padding-bottom: calc(var(--mobileNav) + 24px);
  }
`;
