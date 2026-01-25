'use client';

import Image from 'next/image';

import IntroPageCarousel from '@/common/components/ui/IntroPageCarousel';
import { INTRO_IMAGES, SECTION_IMAGES } from '../_constants/images';
import {
  DesktopSection,
  FeatureImage,
  FlexCol,
  FlexRow,
  ImageScroll,
  Logo,
  PageWrapper,
  SubText,
  Text,
  Title,
} from '../_styles/intro.styles';
import DownloadButtons from './DownloadButtons';

const IntroDesktop = () => {
  return (
    <PageWrapper>
      {/* Intro */}
      <DesktopSection $bg="white">
        <section>
          <Logo $desktop>
            <span>everstamp</span>
          </Logo>
          <Text $desktop>
            <span>내일 더 나은 나로 나아가기 위해</span>
            <span>감정 일기와 습관 만들기를 시작하세요.</span>
          </Text>
          <DownloadButtons inlineWebLink />
          <FlexCol>
            <SubText $desktop>iOS 사용자의 경우 PWA를 설치하여 이용 가능합니다.</SubText>
            <SubText $desktop>*로그인 화면이 나타나지 않는 경우, 앱을 재실행 해주세요.</SubText>
          </FlexCol>
        </section>
        <section>
          <IntroPageCarousel
            images={SECTION_IMAGES.intro}
            keyValue="intro"
            type="fullWidth"
            width="100%"
            height="85%"
            borderRadius="28px"
          />
        </section>
      </DesktopSection>

      {/* Emotion */}
      <DesktopSection $bg="theme">
        <section>
          <FeatureImage
            className="emotions"
            $desktop
            src={INTRO_IMAGES.emotions}
            alt="emotions"
            width={700}
            height={700}
          />
        </section>
        <section>
          <Title $desktop>#emotions</Title>
          <Text $desktop>
            <span>감정을 정리하고 기록하세요.</span>
            <span>긍정적 변화가 시작됩니다.</span>
            <span>함께 감정 일기를 시작해볼까요?</span>
          </Text>
          <FlexCol>
            <SubText $desktop>&apos;기쁨&apos;, &apos;행복&apos;, &apos;무난한 감정&apos;, &apos;슬픔&apos;, &apos;분노&apos;</SubText>
            <SubText $desktop>5가지 감정 선택을 지원합니다.</SubText>
          </FlexCol>
        </section>
      </DesktopSection>

      {/* View */}
      <DesktopSection $bg="white">
        <section>
          <Title $desktop>#view feature</Title>
          <Text $desktop>
            <span>일기, 감정, 습관 목록을</span>
            <span>한눈에 확인 하세요.</span>
          </Text>
          <FlexCol>
            <SubText $desktop>리스트 뷰에서 감정별 모아보기와</SubText>
            <SubText $desktop>날짜별 오름/내림 차순 정렬을 지원합니다.</SubText>
          </FlexCol>
        </section>
        <section>
          <IntroPageCarousel
            images={SECTION_IMAGES.view}
            keyValue="view"
            type="fullWidth"
            width="100%"
            height="85%"
            borderRadius="28px"
          />
        </section>
      </DesktopSection>

      {/* Habit - box */}
      <DesktopSection $bg="theme" $height="60dvh">
        <section>
          <FeatureImage
            className="habitbox"
            $desktop
            src={INTRO_IMAGES.habitbox}
            alt="habitbox"
            width={300}
            height={300}
          />
        </section>
        <section>
          <Title $desktop>#habit feature</Title>
          <Text $desktop>
            <span>완벽하지 않아도 괜찮습니다.</span>
            <span>부담없는 습관부터 시도하세요.</span>
          </Text>
          <FlexCol>
            <SubText $desktop>습관 목록은 최대 18개까지 생성 가능하며</SubText>
            <SubText $desktop>최근 4일 동안만 완료 여부를 선택할 수 있습니다.</SubText>
          </FlexCol>
        </section>
      </DesktopSection>

      {/* Habit - view */}
      <DesktopSection $bg="theme">
        <section>
          <IntroPageCarousel
            images={SECTION_IMAGES.habit}
            keyValue="habit"
            type="fullWidth"
            width="100%"
            height="85%"
            borderRadius="28px"
          />
        </section>
        <section>
          <Title $desktop>#habit view feature</Title>
          <Text $desktop>
            <span>습관이 형성되는 시간 21일</span>
            <span>실천 결과를 확인하고 점검하세요.</span>
          </Text>
          <FlexCol>
            <SubText $desktop>월간 습관 실천 여부는 달력 형태로</SubText>
            <SubText $desktop>연간 실천 여부는 그래프로 확인 가능합니다.</SubText>
          </FlexCol>
        </section>
      </DesktopSection>

      {/* UI */}
      <DesktopSection $bg="white" className="center">
        <Title $desktop>#Responsive UI</Title>
        <Text $desktop>
          <span>모바일, 데스크탑 PC, 태블릿 등</span>
          <span>다양한 환경에 최적화된 UI를 제공합니다.</span>
        </Text>
        <ImageScroll $desktop>
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
      </DesktopSection>

      {/* Others */}
      <DesktopSection $bg="theme" className="center">
        <Title $desktop>#other feature</Title>
        <Text $desktop>
          <span>암호화, 테마, 멀티 플랫폼 최적화 등</span>
          <span>추가적인 사용자 편의 기능을 제공합니다.</span>
        </Text>
        <FlexRow>
          {SECTION_IMAGES.otherInfo.map((src, i) => (
            <FeatureImage
              key={`other-${i}`}
              className="otherinfo"
              src={src}
              alt="otherinfo"
              width={600}
              height={600}
              priority
            />
          ))}
        </FlexRow>
      </DesktopSection>

      {/* Outro */}
      <DesktopSection $bg="themeDark" $height="50dvh">
        <section>
          <DownloadButtons variant="outro" />
          <Logo $variant="outro" $desktop>
            <span>everstamp</span>
          </Logo>
        </section>
      </DesktopSection>
    </PageWrapper>
  );
};

export default IntroDesktop;
