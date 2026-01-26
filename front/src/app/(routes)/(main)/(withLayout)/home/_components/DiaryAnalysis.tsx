'use client';

import { DiaryStats } from "@/common/fetchers/stats";
import styled from "styled-components";

interface Props {
  stats?: DiaryStats;
  year: number;
  isLoading: boolean;
}

const DiaryAnalysis = ({ stats, year, isLoading }: Props) => {
  const formatTextLength = (length: number) => {
    if (length < 1000) return { value: length, unit: '자' };
    if (length < 10000) return { value: (length / 1000).toFixed(1), unit: '천자' };
    return { value: (length / 10000).toFixed(1), unit: '만자' };
  };

  const currentStreak = stats?.currentStreak?.days ?? 0;
  const longestStreak = stats?.longestStreak?.days ?? 0;
  const totalTextLength = stats?.totalTextLength ?? 0;
  const textLengthFormatted = formatTextLength(totalTextLength);

  const totalCount = stats?.totalCount ?? 0;

  return (
    <Wrapper>
      <TitleWrapper>
        <SectionTitle>일기 정보</SectionTitle>
        <TotalCount>총 {totalCount}개의 일기</TotalCount>
      </TitleWrapper>

      <StatsGrid>
        <StatCard>
          <StatLabel>현재 연속 기록</StatLabel>
          <StatValueWrapper>
            <StatValue>{currentStreak}</StatValue>
            <StatUnit>일</StatUnit>
          </StatValueWrapper>
        </StatCard>

        <StatCard>
          <StatLabel>최장 연속 기록</StatLabel>
          <StatValueWrapper>
            <StatValue>{longestStreak}</StatValue>
            <StatUnit>일</StatUnit>
          </StatValueWrapper>
        </StatCard>

        <StatCard>
          <StatLabel>총 텍스트량</StatLabel>
          <StatValueWrapper>
            <StatValue>{textLengthFormatted.value}</StatValue>
            <StatUnit>{textLengthFormatted.unit}</StatUnit>
          </StatValueWrapper>
        </StatCard>
      </StatsGrid>

      <ChartSection>
        <ChartTitle>{year}년 월간 기록 그래프</ChartTitle>
        <ChartWrapper>
          {(stats?.monthlyCount ?? Array(12).fill(0)).map((count, index) => {
            const maxCount = Math.max(...(stats?.monthlyCount ?? [1]), 1);
            const barHeight = count > 0 ? Math.max((count / maxCount) * 72, 8) : 4;
            return (
              <BarWrapper key={index}>
                <BarArea>
                  <Bar $height={barHeight} $hasValue={count > 0} />
                </BarArea>
                <BarLabel>{index + 1}</BarLabel>
              </BarWrapper>
            );
          })}
        </ChartWrapper>
      </ChartSection>
    </Wrapper>
  );
};

export default DiaryAnalysis;

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
  padding: 20px 12px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  gap: 4px;
  min-height: 100px;
  
  @media (min-width: 480px) {
    padding: 24px 16px;
    min-height: 110px;
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

const StatValueWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  line-height: 1.2;
`;

const StatValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.themeColor ?? '#979FC7'};
  
  @media (min-width: 480px) {
    font-size: 32px;
  }
`;

const StatUnit = styled.span`
  font-size: 14px;
  color: rgba(var(--greyTitle), 0.6);
  
  @media (min-width: 480px) {
    font-size: 15px;
  }
`;

const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ChartTitle = styled.h3`
  display: block;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  color: grey;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 16px 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
`;

const BarArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 80px;
  width: 100%;
`;

const Bar = styled.div<{ $height: number; $hasValue: boolean }>`
  width: 60%;
  max-width: 20px;
  min-height: 4px;
  height: ${({ $height }) => $height}px;
  background-color: ${({ $hasValue, theme }) =>
    $hasValue ? (theme.themeColor ?? '#979FC7') : 'rgba(var(--greyTitle), 0.15)'};
  border-radius: 3px;
  transition: height 0.3s ease;
`;

const BarLabel = styled.span`
  font-size: 10px;
  color: rgba(var(--greyTitle), 0.6);
`;
