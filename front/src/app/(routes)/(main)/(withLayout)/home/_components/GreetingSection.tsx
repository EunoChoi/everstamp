'use client';

import Image from "next/image";
import Link from "next/link";
import { MdCalendarMonth, MdCheckBox } from 'react-icons/md';
import styled from "styled-components";

import { getDiaryMainMessage } from "../_messages/diaryMessages";
import emotionsImage from '/public/img/emotion/emotions.png';

interface Props {
  year: number;
  totalDiaries: number;
}

const GreetingSection = ({ year, totalDiaries }: Props) => {
  const getMainMessage = () => getDiaryMainMessage(year, totalDiaries);

  return (
    <Wrapper>
      <EmotionImageWrapper>
        <Image
          src={emotionsImage}
          alt="emotions"
          width={1200}
          height={900}
          priority
          quality={100}
          unoptimized={false}
        />
      </EmotionImageWrapper>
      <Title>툭! 오늘도 하나씩 :)</Title>
      <SubTitle>
        <SubTitleLine>완벽한 하루가 아니어도 괜찮아요.</SubTitleLine>
        <SubTitleLine>발자국 하나만 남겨도 충분해요.</SubTitleLine>
      </SubTitle>
      <Description>
        {getMainMessage() && <MainMessage>{getMainMessage()}</MainMessage>}
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

const EmotionImageWrapper = styled.div`
  width: 80%;
  margin: 24px auto;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
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

const SubTitle = styled.p`
  font-size: 20px;
  color: rgb(var(--greyTitle));
  line-height: 1.5;
  overflow-wrap: break-word;
  text-align: justify;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  @media (min-width: 480px) {
    font-size: 21px;
  }
`;

const SubTitleLine = styled.span`
  display: block;
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
