import Image from 'next/image';
import styled from 'styled-components';

// 공통
export const PageWrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-y: scroll;
  background-color: #f3f7fc;
`;

// 모바일 섹션
export const MobileSection = styled.div<{ $bg?: 'white' | 'theme' | 'themeDark' }>`
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${({ $bg }) => {
    if ($bg === 'white') return '#f3f7fc';
    if ($bg === 'themeDark') return '#8CADE255';
    return '#8CADE233';
  }};

  width: 100%;
  height: auto;
  padding: 56px 0;

  > * {
    margin: 24px 0;
  }

  @media (min-width: 480px) and (max-width: 1024px) {
    padding: 64px 0;
    > * {
      margin: 28px 0;
    }
  }
`;

// 데스크탑 섹션
export const DesktopSection = styled.section<{ $bg?: 'white' | 'theme' | 'themeDark'; $height?: string }>`
  height: ${({ $height }) => $height || '95dvh'};
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 10dvw;

  background-color: ${({ $bg }) => {
    if ($bg === 'white') return '#f3f7fc';
    if ($bg === 'themeDark') return '#8CADE255';
    return '#8CADE233';
  }};

  > section {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > * {
      margin: 32px 0;
    }
  }

  &.center {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > * {
      margin: 32px 0;
    }
  }
`;

// 로고 래퍼
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 제목
export const Title = styled.span<{ $desktop?: boolean }>`
  color: #8CADE2;
  font-size: ${({ $desktop }) => ($desktop ? '28px' : '20px')};
  font-weight: 500;
  text-transform: capitalize;

  @media (min-width: 480px) and (max-width: 1024px) {
    font-size: 22px;
  }
`;

// 본문 텍스트
export const Text = styled.div<{ $desktop?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  &.left {
    align-items: start;
  }
  &.right {
    align-items: end;
  }

  span {
    font-size: ${({ $desktop }) => ($desktop ? '34px' : '20px')};
    color: ${({ $desktop }) => ($desktop ? '#5f5f5f' : 'rgb(var(--greyTitle))')};
    line-height: 1.4;
    ${({ $desktop }) => $desktop && 'white-space: nowrap;'}

    @media (min-width: 480px) and (max-width: 1024px) {
      font-size: 28px;
    }
  }
`;

// 부제목
export const SubText = styled.span<{ $desktop?: boolean }>`
  color: grey;
  font-size: ${({ $desktop }) => ($desktop ? '18px' : '14px')};

  @media (min-width: 480px) and (max-width: 1024px) {
    font-size: 16px;
  }
`;

// 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
`;

// 다운로드 버튼
export const DownloadButton = styled.button<{ $variant?: 'outline' | 'outro' }>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 6px;
  padding: 6px 24px;
  border-radius: 32px;
  font-size: 16px;
  color: rgb(var(--greyTitle));
  border: 2px solid rgba(0, 0, 0, 0.1);
  background-color: #8CADE255;

  .icon {
    margin-right: 8px;
  }

  ${({ $variant }) =>
    $variant === 'outline' &&
    `
    background-color: transparent;
    border-color: #8CADE255;
    padding: 6px 32px;
  `}

  ${({ $variant }) =>
    $variant === 'outro' &&
    `
    background-color: rgba(255, 255, 255, 0.8);
    border-color: #8CADE255;
  `}
`;

// 웹 실행 링크
export const WebLink = styled.button<{ $variant?: 'outro' }>`
  font-size: 16px;
  padding: 0 4px;
  border-bottom: solid 2px #8CADE255;
  color: #8CADE2;

  ${({ $variant }) =>
    $variant === 'outro' &&
    `
    color: rgb(var(--greyTitle));
    border-color: rgb(var(--greyTitle));
  `}
`;

// Flex 컨테이너
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(var(--greyTitle));

  &.left {
    align-items: start;
  }
  &.right {
    align-items: end;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: rgb(var(--greyTitle));
`;

// 아이콘 + 텍스트
export const IconLabel = styled.div`
  margin: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 16px;
    margin-top: 8px;

    @media (min-width: 480px) and (max-width: 1024px) {
      font-size: 16px;
    }
  }
`;

// 이미지 스크롤 컨테이너
export const ImageScroll = styled.div<{ $desktop?: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100dvw;
  overflow-x: scroll;
  padding: ${({ $desktop }) => ($desktop ? '18px 72px' : '18px 36px')};

  .uiImage {
    flex-shrink: 0;
    height: ${({ $desktop }) => ($desktop ? '400px' : '300px')};
    width: auto;
    max-width: none;
    margin: 0 ${({ $desktop }) => ($desktop ? '18px' : '9px')};
  }
`;

// 기능 이미지
export const FeatureImage = styled(Image)<{ $desktop?: boolean }>`
  width: auto;

  &.emotions {
    width: ${({ $desktop }) => ($desktop ? '500px' : '300px')};
  }

  &.habitbox {
    width: ${({ $desktop }) => ($desktop ? '300px' : '240px')};
    height: ${({ $desktop }) => ($desktop ? '300px' : '240px')};
    border-radius: 16px;
    background-color: white;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
    margin: 0 4px;
  }

  &.otherinfo {
    width: 220px;
    border-radius: 16px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    object-fit: cover;
    margin: 0 16px;
  }
`;
