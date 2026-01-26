'use client';

import { StarRating } from "@/common/components/ui/StarRating";
import { HabitStats } from "@/common/fetchers/stats";
import { useState } from "react";
import styled from "styled-components";

import { getHabitMessage } from "../_messages/habitMessages";

interface Props {
  stats?: HabitStats;
  isLoading: boolean;
}

type HabitTab = 'top' | 'bottom';

const HabitAnalysis = ({ stats, isLoading }: Props) => {
  const [habitTab, setHabitTab] = useState<HabitTab>('top');

  const habits = habitTab === 'top' ? stats?.topHabits : stats?.bottomHabits;
  const hasHabits = habits && habits.length > 0;

  const formatAvg = (avg: number) => {
    if (avg === 0) return '-';
    const floor = Math.floor(avg);
    const ceil = Math.ceil(avg);
    if (floor === ceil) return `${floor}개`;
    return `${floor}~${ceil}개`;
  };

  const getMessage = () => getHabitMessage(stats);

  return (
    <Wrapper>
      <TitleWrapper>
        <SectionTitle>습관 정보</SectionTitle>
        <TotalCount>생성 습관 {stats?.totalHabits ?? 0}개</TotalCount>
      </TitleWrapper>

      <TabWrapper>
        <Tab
          $active={habitTab === 'top'}
          onClick={() => setHabitTab('top')}>
          상위 습관 3
        </Tab>
        <Tab
          $active={habitTab === 'bottom'}
          onClick={() => setHabitTab('bottom')}>
          하위 습관 3
        </Tab>
      </TabWrapper>

      <HabitList>
        {hasHabits ? (
          habits.slice(0, 3).map((habit, index) => (
            <HabitCard key={habit.id}>
              <StarRating rating={habit.priority + 1} className="star-rating" />
              <HabitName>{habit.name}</HabitName>
              <HabitCount>{habit.count}회</HabitCount>
            </HabitCard>
          ))
        ) : (
          <EmptyMessage>
            {habitTab === 'top' ? '아직 완료한 습관이 없어요' : '데이터가 부족해요'}
          </EmptyMessage>
        )}
      </HabitList>

      {habitTab === 'bottom' && (
        <HabitInfo>
          한 번도 실천한 적 없는 습관은 하위 습관에 포함되지 않아요.
        </HabitInfo>
      )}

      <StatsSection>
        <StatsTitle>습관 완료 통계</StatsTitle>
        <StatsGrid>
          <StatCard>
            <StatLabel>총 습관 완료</StatLabel>
            <StatValue>{stats?.totalCompletions ?? 0}회</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>습관 완료한 일기</StatLabel>
            <StatValue>{stats?.diariesWithHabits ?? 0}개</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>습관 완료한 날</StatLabel>
            <StatValue>{stats?.habitCompletionDays ?? 0}일</StatValue>
          </StatCard>
        </StatsGrid>
        <DetailSection>
          <DetailItem>
            <DetailLabel>습관이 있는 일기 기준 평균</DetailLabel>
            <DetailValue>{formatAvg(stats?.avgHabitsPerDiaryWithHabits ?? 0)}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>습관 완료한 날 기준 평균</DetailLabel>
            <DetailValue>{formatAvg(stats?.avgHabitsPerCompletionDay ?? 0)}</DetailValue>
          </DetailItem>
        </DetailSection>
      </StatsSection>

      <HabitMessageCard>
        <HabitMessageContent>
          <span>{getMessage()}</span>
        </HabitMessageContent>
      </HabitMessageCard>
    </Wrapper>
  );
};

export default HabitAnalysis;

const Wrapper = styled.section`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 32px;
  font-family: 'BMJUA';
  flex: 1;
  
  @media (min-width: 1025px) {
    font-size: 36px;
  }
`;

const TotalCount = styled.span`
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.6);
  white-space: nowrap;
  flex-shrink: 0;
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Tab = styled.button<{ $active: boolean }>`
  font-size: 16px;
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  color: ${({ $active }) => $active ? 'rgb(var(--greyTitle))' : 'rgba(var(--greyTitle), 0.5)'};
  padding-bottom: 4px;
  border-bottom: 2px solid ${({ $active, theme }) => $active ? (theme.themeColor ?? '#979FC7') : 'transparent'};
`;

const HabitList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 4px 0;
  width: 100%;
  overflow: hidden;
`;

const HabitCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  padding: 12px 8px;
  overflow: hidden;
  
  .star-rating {
    font-size: 11px;
    color: ${props => props.theme.themeColor ?? '#979FC7'};
    gap: 2px;
    opacity: 0.8;
    flex-shrink: 0;
  }
  
  @media (min-width: 480px) {
    height: 130px;
    padding: 16px 12px;
    
    .star-rating {
      font-size: 12px;
    }
  }
`;

const HabitName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--greyTitle));
  width: 100%;
  min-width: 0;
  text-align: center;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: calc(1.4em * 2);
  
  @media (min-width: 480px) {
    font-size: 18px;
    max-height: calc(1.4em * 2);
  }
`;

const HabitCount = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: rgba(var(--greyTitle), 0.6);
  
  @media (min-width: 480px) {
    font-size: 14px;
  }
`;

const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1 / -1;
  width: 100%;
  min-height: 80px;
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.5);
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  
  @media (min-width: 480px) {
    min-height: 90px;
  }
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatsTitle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  color: grey;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  gap: 4px;
  min-height: 120px;
  
  @media (min-width: 480px) {
    min-height: 130px;
    padding: 20px 16px;
  }
`;

const StatLabel = styled.span`
  font-size: 13px;
  color: rgba(var(--greyTitle), 0.7);
  text-align: center;
  
  @media (min-width: 480px) {
    font-size: 14px;
  }
`;

const StatValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.themeColor ?? '#979FC7'};
  
  @media (min-width: 480px) {
    font-size: 28px;
  }
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  
  @media (min-width: 480px) {
    padding: 20px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.7);
  
  @media (min-width: 480px) {
    font-size: 15px;
  }
`;

const DetailValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.themeColor ?? '#979FC7'};
  white-space: nowrap;
  
  @media (min-width: 480px) {
    font-size: 18px;
  }
`;

const HabitInfo = styled.p`
  font-size: 16px;
  color: rgba(var(--greyTitle), 0.6);
  line-height: 1.5;
  margin-top: -8px;
  word-break: keep-all;
  overflow-wrap: break-word;
  text-align: justify;
`;

const HabitMessageCard = styled.div`
  padding: 20px 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  
  @media (min-width: 480px) {
    padding: 24px 20px;
  }
`;

const HabitMessageContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  span {
    font-size: 16px;
    color: rgb(var(--greyTitle));
    line-height: 1.5;
    word-break: keep-all;
    overflow-wrap: break-word;
    text-align: justify;
    flex: 1;
  }
`;
