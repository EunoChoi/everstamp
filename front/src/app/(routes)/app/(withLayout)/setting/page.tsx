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

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LogoutIcon from '@mui/icons-material/Logout';

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
          <Title>user info</Title>
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
            <SubTitle>font</SubTitle>
            <SettingItem
              settingItemKey="다이어리 글씨 크기"
              settingItemValue={<FontSizeSelector fontSizeUpdate={fontSizeUpdate} />} />
          </SubSection>
          <SubSection>
            <SubTitle>habit order</SubTitle>
            <SettingItem
              settingItemKey="습관 순서 커스텀"
              settingItemValue={
                <button onClick={() => {
                  router.push('/app/inter/habitOrder', { scroll: false })
                }}>
                  <LowPriorityRoundedIcon fontSize="small" />
                </button>} />
          </SubSection>
        </Section>

        <Section>
          <Title>Account</Title>
          <SubSection>
            <SettingItem
              settingItemKey="로그아웃"
              settingItemValue={
                <button onClick={onLogout}>
                  <LogoutIcon fontSize="small" />
                </button>} />
            <SettingItem
              settingItemKey="회원 탈퇴"
              settingItemValue={
                <button onClick={onDeleteAccount}>
                  <DeleteForeverIcon fontSize="small" />
                </button>} />
          </SubSection>
        </Section>
      </SettingContentWrapper>
    </PageWrapper >
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

  gap: 24px;
`
const SubSection = styled.section`
  padding: 0 12px;
  display: flex;
  flex-direction: column;
`
const Title = styled.span`
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
