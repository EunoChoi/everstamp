'use client';

import Link from "next/link";
import { getMonth } from "date-fns";
import { MdCalendarMonth, MdCheckBox } from 'react-icons/md';
import styled from "styled-components";

import { MONTHLY_MESSAGES } from "../_messages/monthlyMessages";
import { getDiaryMainMessage } from "../_messages/diaryMessages";

interface Props {
  year: number;
  totalDiaries: number;
}

const GreetingSection = ({ year, totalDiaries }: Props) => {
  const currentMonth = getMonth(new Date()) + 1;
  const monthlyMessage = MONTHLY_MESSAGES[currentMonth] || '오늘도 소중한 하루를 기록해보세요.';

  const getGreetingEmoji = () => {
    if (totalDiaries === 0) return ':)';
    if (totalDiaries < 10) return ':D';
    if (totalDiaries < 50) return '^_^';
    if (totalDiaries < 100) return '♥';
    return '★';
  };

  const getMainMessage = () => getDiaryMainMessage(year, totalDiaries);

  return (
    <Wrapper>
      <Title>안녕하세요 {getGreetingEmoji()}</Title>
      <Description>
        <MainMessage>{getMainMessage()}</MainMessage>
        {totalDiaries > 0 && <MonthlyMessage>{monthlyMessage}</MonthlyMessage>}
      </Description>
      <LinkWrapper>
        <StyledLink href="/calendar">
          <LinkIcon><MdCalendarMonth /></LinkIcon>
          <LinkText>일기 작성하러 가기</LinkText>
        </StyledLink>
        <StyledLink href="/habit">
          <LinkIcon><MdCheckBox /></LinkIcon>
          <LinkText>습관 관리하러 가기</LinkText>
        </StyledLink>
      </LinkWrapper>
    </Wrapper>
  );
};

export default GreetingSection;

const Wrapper = styled.section`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 32px;
  font-family: 'BMJUA';
  
  @media (min-width: 1025px) {
    font-size: 36px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainMessage = styled.span`
  font-size: 16px;
  color: rgb(var(--greyTitle));
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: break-word;
  text-align: justify;
`;

const MonthlyMessage = styled.span`
  font-size: 16px;
  color: rgb(var(--greyTitle));
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: break-word;
  text-align: justify;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (min-width: 480px) {
    flex-direction: row;
    gap: 12px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

const LinkIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${props => props.theme.themeColor ?? '#979FC7'};
  flex-shrink: 0;
`;

const LinkText = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: rgb(var(--greyTitle));
`;
