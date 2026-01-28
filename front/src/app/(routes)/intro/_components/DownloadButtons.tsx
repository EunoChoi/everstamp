'use client';

import { useRouter } from 'next/navigation';
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from 'notistack';
import { MdAndroid, MdInstallMobile } from 'react-icons/md';

import { SnackBarAction } from '@/common/utils/snackBar/SnackBarAction';
import { usePwaInstall } from '../_hooks/usePwaInstall';
import { ButtonGroup, DownloadButton, WebLink } from '../_styles/intro.styles';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share';

interface Props {
  variant?: 'outro';
  inlineWebLink?: boolean; // 버튼에 웹링크 포함 여부
}

const DownloadButtons = ({ variant, inlineWebLink = false }: Props) => {
  const router = useRouter();
  const { installPwa } = usePwaInstall();

  const goToPlayStore = () => {
    router.push(PLAY_STORE_URL);
  };

  const startInWeb = () => {
    const action = (snackbarId: SnackbarKey) => (
      <SnackBarAction
        yesAction={() => {
          closeSnackbar('startInWeb');
          router.push('/');
        }}
        noAction={() => closeSnackbar('startInWeb')}
      />
    );

    enqueueSnackbar(
      <div>
        <p>웹에서 계속 진행하시겠습니까?</p>
        <p style={{ fontSize: '16px', marginTop: '8px', color: '#DC7889' }}>
          🚨 실행 환경에 따라 레이아웃이 어긋날 수 있습니다.
        </p>
        <p style={{ fontSize: '16px', color: '#DC7889' }}>
          원할한 이용을 위해 앱을 설치해주세요.
        </p>
      </div>,
      { key: 'startInWeb', persist: false, action, autoHideDuration: 3000 }
    );
  };

  return (
    <>
      <ButtonGroup>
        <DownloadButton $variant={variant} onClick={goToPlayStore}>
          <MdAndroid className="icon" />Android
        </DownloadButton>
        <DownloadButton $variant={variant} onClick={installPwa}>
          <MdInstallMobile className="icon" />PWA
        </DownloadButton>
        {inlineWebLink && (
          <DownloadButton $variant="outline" onClick={startInWeb}>
            웹에서 실행하기
          </DownloadButton>
        )}
      </ButtonGroup>
      {!inlineWebLink && (
        <WebLink $variant={variant} onClick={startInWeb}>
          웹에서 실행하기
        </WebLink>
      )}
    </>
  );
};

export default DownloadButtons;
