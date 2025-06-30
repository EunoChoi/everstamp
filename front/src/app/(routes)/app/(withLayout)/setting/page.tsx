'use client';

import useCustomRouter from "@/common/hooks/useCustomRouter";
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import styled from "styled-components";

import { ContentWrapper } from "@/common/components/layout/ContentWrapper";
import { PageWrapper } from "@/common/components/layout/PageWrapper";
import TopButtons from "@/common/components/ui/TopButtons";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";

import AndroidRoundedIcon from '@mui/icons-material/AndroidRounded';
import { FontSizeSelector } from "./_components/FontSizeSelector";
import { SettingItem } from "./_components/SettingItem";
import { ThemeColorSelector } from "./_components/ThemeColorSelector";
import { fontSizeUpdate } from "./_functions/fontSizeUpdate";
import { onDeleteAccount } from "./_functions/onDeleteAccount";
import { onLogout } from "./_functions/onLogout";
import { useCurrentUserData } from "./_hooks/useCurrentUserData";
import { useUpdateThemeColor } from "./_hooks/useUpdateThemeColor";


const SettingPage = () => {
  usePrefetchPage();
  const router = useCustomRouter();

  const { email, provider, createAt } = useCurrentUserData();
  const { updateThemeColor } = useUpdateThemeColor();

  return (
    <PageWrapper>
      <TopButtons>
        <a href="https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer" >
          <button className="auto"><AndroidRoundedIcon fontSize="small" /></button>
        </a>
        <a href="https://everstamp.site"
          target="_blank"
          rel="noopener noreferrer" >
          <button className="normal">intro</button>
        </a>
      </TopButtons>

      <SettingContentWrapper>
        <Section>
          <Title>account</Title>
          <SubSection>
            <SettingItem settingItemKey="이메일" settingItemValue={<span>{email}</span>}></SettingItem>
            <SettingItem settingItemKey="계정 타입" settingItemValue={<span>{provider}</span>}></SettingItem>
            <SettingItem settingItemKey="가입일" settingItemValue={<span>{createAt}</span>}></SettingItem>
          </SubSection>
        </Section>

        <Section>
          <Title>customize</Title>
          <SubSection>
            <SubTitle>theme color</SubTitle>
            <ThemeColorSelector themeColorUpdate={updateThemeColor} />
          </SubSection>
          <SubSection>
            <SubTitle>other options</SubTitle>
            <SettingItem
              settingItemKey="폰트 사이즈"
              settingItemValue={<FontSizeSelector fontSizeUpdate={fontSizeUpdate} />} />
            <SettingItem
              settingItemKey="목표 습관 리스트 정렬"
              settingItemValue={
                <button onClick={() => {
                  router.push('/app/inter/habitOrder', { scroll: false })
                }}>
                  <LowPriorityRoundedIcon fontSize="small" />
                </button>} />
          </SubSection>
        </Section>

        <Section>
          <BottomButtonWrapper className="center">
            <Button onClick={onLogout}>로그아웃</Button>
            <Button onClick={onDeleteAccount}>계정 삭제</Button>
          </BottomButtonWrapper>
        </Section>
      </SettingContentWrapper>
    </PageWrapper>
  );
}

export default SettingPage;

const SettingContentWrapper = styled(ContentWrapper)`
  max-width: 600px;
`
const Section = styled.section`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
`
const SubSection = styled.section`
  margin: 16px 0;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
`
const Title = styled.span`
  /* margin: 16px 0; */
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 32px;
  font-family: 'BMJUA';
  
  @media (min-width:1025px) { //desktop
    font-size: 36px;
  }
`
const SubTitle = styled.span`
  display : block;
  font-size: 22px;
  font-weight: 500;
  text-transform: capitalize;
  color: grey;
`
const BottomButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`
const Button = styled.button`
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  padding: 4px 14px;

  text-transform: capitalize;
  color: rgb(var(--greyTitle));
  font-size: 14px;

  border-radius: 50px;
  border: 2px solid rgba(0,0,0,0.05);
  background-color: #f9f9f9;
`
