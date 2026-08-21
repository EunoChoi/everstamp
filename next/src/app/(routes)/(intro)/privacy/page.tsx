import { ScrollContainer } from '@/common/components/ui/ScrollContainer';
import PrivacyBody from './_components/PrivacyBody';
import PrivacyHeader from './_components/PrivacyHeader';

const PrivacyPage = () => {
  return (
    <ScrollContainer
      className="h-[100dvh] w-[100dvw] bg-theme-bg"
      showScrollFade
      showScrollToTop
    >
      <main className="mx-auto flex w-full max-w-[720px] flex-col px-5 py-10 tablet:px-8 tablet:py-14">
        <PrivacyHeader />
        <PrivacyBody />
      </main>
    </ScrollContainer>
  );
};

export default PrivacyPage;
