'use client';

import Image from 'next/image';
import { MdColorLens, MdLock, MdPhonelink } from 'react-icons/md';

import IntroPageCarousel from '@/common/components/ui/IntroPageCarousel';
import Logo from '@/common/components/ui/Logo';
import { INTRO_IMAGES, SECTION_IMAGES } from '../_constants/images';
import {
  FeatureImage,
  FlexCol,
  FlexRow,
  IconLabel,
  ImageScroll,
  LogoWrapper,
  MobileSection,
  PageWrapper,
  SubText,
  Text,
  Title,
} from '../_styles/intro.styles';
import DownloadButtons from './DownloadButtons';

const IntroMobile = () => {
  return (
    <PageWrapper>
      {/* Intro */}
      <MobileSection $bg="white">
        <LogoWrapper>
          <Logo size={64} />
        </LogoWrapper>
        <Text>
          <span>내일 더 나은 나로 나아가기 위해</span>
          <span>감정 일기와 습관 만들기를 시작하세요.</span>
        </Text>
        <IntroPageCarousel
          images={SECTION_IMAGES.intro}
          keyValue="mobileIntro"
          type="fullWidth"
          width="100dvw"
          height="80dvh"
          borderRadius="28px"
        />
        <DownloadButtons />
        <FlexCol>
          <SubText>iOS 사용자의 경우 PWA를 설치하여 이용 가능합니다.</SubText>
          <SubText>*로그인 화면이 나타나지 않는 경우, 앱을 재실행 해주세요.</SubText>
        </FlexCol>
      </MobileSection>

      {/* Emotion */}
      <MobileSection $bg="theme">
        <Title>#emotions</Title>
        <Text>
          <span>감정을 정리하고 기록하세요.</span>
          <span>긍정적 변화가 시작됩니다.</span>
        </Text>
        <FeatureImage
          className="emotions"
          src={INTRO_IMAGES.emotions}
          alt="emotions"
          width={700}
          height={700}
        />
        <FlexCol>
          <SubText>&apos;기쁨&apos;, &apos;행복&apos;, &apos;무난한 감정&apos;, &apos;슬픔&apos;, &apos;분노&apos;</SubText>
          <SubText>5가지 감정 선택을 지원합니다.</SubText>
        </FlexCol>
      </MobileSection>

      {/* View */}
      <MobileSection $bg="white">
        <Title>#view feature</Title>
        <Text>
          <span>일기, 감정, 습관 목록을 한눈에!</span>
          <span>달력 뷰와 리스트 뷰를 이용하세요.</span>
        </Text>
        <IntroPageCarousel
          images={SECTION_IMAGES.view}
          keyValue="mobileView"
          type="fullWidth"
          width="100%"
          height="80dvh"
          borderRadius="28px"
        />
        <FlexCol>
          <SubText>리스트 뷰에서 감정별 모아보기와</SubText>
          <SubText>날짜별 오름/내림 차순 정렬을 지원합니다.</SubText>
        </FlexCol>
      </MobileSection>

      {/* Habit */}
      <MobileSection $bg="theme">
        <Title>#habit feature</Title>
        <Text>
          <span>완벽하지 않아도 괜찮습니다.</span>
          <span>부담없는 습관부터 시도하세요.</span>
        </Text>
        <FlexRow>
          <FeatureImage
            className="habitbox"
            src={INTRO_IMAGES.habitbox}
            alt="habitbox"
            width={300}
            height={300}
          />
        </FlexRow>
        <FlexCol>
          <SubText>습관 목록은 최대 18개까지 생성 가능하며</SubText>
          <SubText>최근 4일 동안만 완료 여부를 선택할 수 있습니다.</SubText>
        </FlexCol>
        <span></span>
        <Title>#habit view feature</Title>
        <Text>
          <span>습관이 형성되는 시간 21일!</span>
          <span>실천 결과를 확인하고 점검하세요.</span>
        </Text>
        <IntroPageCarousel
          images={SECTION_IMAGES.habit}
          keyValue="mobileHabit"
          type="fullWidth"
          width="100%"
          height="80dvh"
          borderRadius="28px"
        />
        <FlexCol>
          <SubText>월간 습관 실천 여부는 달력 형태로</SubText>
          <SubText>연간 실천 여부는 그래프로 확인 가능합니다.</SubText>
        </FlexCol>
      </MobileSection>

      {/* UI */}
      <MobileSection $bg="white">
        <Title>#Responsive UI</Title>
        <Text>
          <span>모바일, 데스크탑 PC, 태블릿 등</span>
          <span>다양한 환경에 최적화된 UI를 제공합니다.</span>
        </Text>
        <ImageScroll>
          {SECTION_IMAGES.ui.map((src, i) => (
            <Image
              key={`ui-${i}`}
              className="uiImage"
              src={src}
              alt="ui"
              width={500}
              height={500}
              priority
            />
          ))}
        </ImageScroll>
      </MobileSection>

      {/* Others */}
      <MobileSection $bg="theme">
        <Title>#other feature</Title>
        <Text>
          <span>암호화, 테마, 멀티 플랫폼 최적화 등</span>
          <span>추가적인 사용자 편의 기능을 제공합니다.</span>
        </Text>
        <FlexRow>
          <IconLabel>
            <MdLock size={32} />
            <span>텍스트 암호화</span>
          </IconLabel>
          <IconLabel>
            <MdColorLens size={32} />
            <span>테마 설정</span>
          </IconLabel>
          <IconLabel>
            <MdPhonelink size={32} />
            <span>멀티 플랫폼</span>
          </IconLabel>
        </FlexRow>
        <IntroPageCarousel
          images={SECTION_IMAGES.otherInfo}
          keyValue="otherInfo"
          type="fullWidth"
          width="100%"
          height="50dvh"
          borderRadius="16px"
          className="otherinfo"
        />
      </MobileSection>

      {/* Outro */}
      <MobileSection $bg="themeDark">
        <DownloadButtons variant="outro" />
        <LogoWrapper>
          <Logo size={64} />
        </LogoWrapper>
      </MobileSection>
    </PageWrapper>
  );
};

export default IntroMobile;
