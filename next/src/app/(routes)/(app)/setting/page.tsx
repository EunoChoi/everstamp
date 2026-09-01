'use client';


import AppPageLayout from "@/common/components/layout/AppPageLayout";
import PageTitle from "@/common/components/ui/PageTitle";
import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import { usePrefetchPage } from "@/common/hooks/usePrefetchPage";
import { format } from "date-fns";

import TopButton from '@/common/components/ui/TopButton';
import { useRouter } from 'next/navigation';
import { AccountInfoSection } from "./_components/AccountInfoSection";
import { ThemeSettingsSection } from "./_components/ThemeSettingsSection";

import { MdPrivacyTip } from "react-icons/md";
import { AccountActionSection } from "./_components/AccountActionSection";


const SettingPage = () => {
  usePrefetchPage();

  const router = useRouter();
  const { data: user } = useCurrentUser();
  const email = user?.email ?? '-';
  const provider = user?.provider ?? '-';
  const createAt = user?.createdAt ? format(user.createdAt, 'yyyy.MM.dd') : '-';


  return (
    <AppPageLayout
      contentProps={{ className: "gap-6" }}
      showScrollToTop={false}
      topButton={<>
        <TopButton
          size="auto"
          onClick={() => router.push('https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share')}>
          PlayStore
        </TopButton>
        <TopButton
          size="auto"
          aria-label="개인정보 처리방침"
          onClick={() => router.push('/privacy')}
        >
          <MdPrivacyTip size={18} />
        </TopButton>
      </>}>

      <PageTitle title="앱 설정" />

      <ThemeSettingsSection />
      <AccountInfoSection email={email} provider={provider} createAt={createAt} />
      <AccountActionSection onDeleteAccount={() => router.push('/account-deletion')} />
    </AppPageLayout >
  );
};

export default SettingPage;
