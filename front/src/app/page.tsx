'use client';

import Image from "next/image";
import styled from "styled-components";

import calendar from '/public/img/intro/calendar.png';
import list from '/public/img/intro/list.png';
import listDesktop from '/public/img/intro/listDesktop.png';
import zoom1 from '/public/img/intro/zoom1.png';
import zoom2 from '/public/img/intro/zoom2.png';
import habit from '/public/img/intro/habit.png';
import habitinfo1 from '/public/img/intro/habitinfo1.png';
import habitinfo2 from '/public/img/intro/habitinfo2.png';
import habitinfoDesktop1 from '/public/img/intro/habitinfoDesktop1.png';
import habitinfoDesktop2 from '/public/img/intro/habitinfoDesktop2.png';
import setting from '/public/img/intro/setting.png';


import emotions2 from '/public/img/emotion/emotions2.png';
import habitbox from '/public/img/intro/habitbox.png';
import otherinfo1 from '/public/img/intro/otherinfo1.png';
import otherinfo2 from '/public/img/intro/otherinfo2.png';
import otherinfo3 from '/public/img/intro/otherinfo3.png';



import { useRouter } from "next/navigation";

import LockIcon from '@mui/icons-material/Lock';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import IsMobile from "@/function/IsMobile";
import { useEffect, useState } from "react";


const Page = () => {

  const router = useRouter();
  const isMobile = IsMobile();

  const [pwa, setPwa] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setPwa(e);
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
  }, []);

  const installPwa = () => {
    if (pwa) {
      pwa.prompt();
      pwa.userChoice.then((result: any) => {
        if (result.outcome === 'accepted') {
          console.log('install pwa...');
        }
        else {
          console.log('deny');
        }
        setPwa(null);
      })
    }
    else {
      alert(`이미 앱이 설치되어 있는 경우 혹은\n자동 설치를 지원하지 않는 브라우저입니다.\n \n '메뉴(공유하기)->홈 화면에 추가'를\n진행하여 앱을 설치해주세요.`);
    }
  }



  if (isMobile == null) return <></>;
  return (
    <Wrapper>
      <Section className="intro">
        <Logo>
          <div>
            <span>ever</span><span>stamp</span>
          </div>
          <span>grow every day</span>
        </Logo>
        <Text>
          <span>당신의 긍정적 변화와 성장을 위한</span>
          <span>감정 일기와 습관 만들기를 실천하세요.</span>
        </Text>

        <ImageWrapper>
          {isMobile || <Img className="slide desktop" src={habitinfoDesktop1} alt="habitinfoDesktop1" width={1400} height={400} priority></Img>}
          {/* {isMobile || <Img className="slide desktop" src={listDesktop} alt="calendar" width={1200} height={400} priority></Img>} */}
          <Img className="slide" src={calendar} alt="calendar" width={400} height={400} priority></Img>
          <Img className="slide" src={list} alt="list" width={400} height={400} ></Img>
          <Img className="slide" src={zoom1} alt="zoom1" width={400} height={400} ></Img>
          {/* <Img className="slide" src={zoom2} alt="zoom2" width={400} height={400} ></Img> */}
          <Img className="slide" src={habit} alt="habit" width={400} height={400} ></Img>
          {/* <Img className="slide" src={habitinfo1} alt="habitinfo1" width={400} height={400} ></Img> */}
          <Img className="slide" src={habitinfo2} alt="habitinfo2" width={400} height={400} ></Img>
          {/* <Img className="slide" src={setting} alt="setting" width={400} height={400} ></Img> */}
        </ImageWrapper>

        <div>
          <Button onClick={installPwa}>앱 다운로드</Button>
          <Button onClick={() => (router.push('/app'))}>웹에서 실행</Button>
        </div>
        <ColWrapper>
          <SubText>일부 브라우저에서 다운로드 버튼이 동작하지 않습니다.</SubText>
          <SubText>{`'메뉴(공유하기) -> 홈 화면에 추가'로 앱 설치가 가능합니다.`}</SubText>
        </ColWrapper>
      </Section>
      <Section className="emotion">
        <Title>#emotions</Title>
        <Text>
          <span>나의 모든 감정을 솔직하게 기록하면</span>
          <span>나를 이해하고 사랑하는데 도움이 됩니다.</span>
          <span>함께 감정 일기를 시작해볼까요?</span>
        </Text>
        <Img className="emotionImg" src={emotions2} alt="emotions2" width={300} height={300}></Img>
        <ColWrapper>
          <SubText>5가지 감정 선택을 지원합니다.</SubText>
          <SubText>'기쁨', '행복', '무난한 감정', '슬픔', '분노'</SubText>
        </ColWrapper>
      </Section>
      <Section className="view">
        <Title>#view feature</Title>
        <Text>
          <span>감정과 습관 완료 여부를 한눈에 확인!</span>
          <span>달력 뷰와 리스트 뷰를 이용하세요.</span>
        </Text>
        <ImageWrapper>
          {isMobile || <Img className="slide desktop" src={listDesktop} alt="calendar" width={1200} height={400}></Img>}
          <Img className="slide" src={calendar} alt="calendar" width={400} height={400} ></Img>
          <Img className="slide" src={list} alt="list" width={400} height={400} ></Img>
          <Img className="slide" src={zoom1} alt="zoom1" width={400} height={400} ></Img>
          <Img className="slide" src={zoom2} alt="zoom2" width={400} height={400} ></Img>
        </ImageWrapper>
        <ColWrapper>
          <SubText>리스트 뷰에서 감정별 모아보기와</SubText>
          <SubText>날짜별 오름/내림 차순 정렬을 지원합니다.</SubText>
        </ColWrapper>
      </Section>
      <Section className="habit">
        <Title>#habit feature</Title>
        <Text>
          <span>작은 변화가 큰 차이를 만듭니다.</span>
          <span>매일의 습관을 기록하며 나아가세요.</span>
        </Text>
        <RowWrapper>
          <Img className="habitbox" src={habitbox} alt="habitbox" width={400} height={400}></Img>
        </RowWrapper>
        <ColWrapper>
          <SubText>습관 목록은 최대 18개까지 생성 가능하며</SubText>
          <SubText>최근 4일 동안만 완료 여부를 선택할 수 있습니다.</SubText>
        </ColWrapper>
        <span></span>
        <span></span>
        <Text>
          <span>꾸준함이 습관을 만들어냅니다.</span>
          <span>월별, 연간 습관 실천 여부를 확인하세요.</span>
        </Text>
        <ImageWrapper>
          {isMobile || <Img className="slide desktop" src={habitinfoDesktop1} alt="habitinfoDesktop1" width={1200} height={400} ></Img>}
          {isMobile || <Img className="slide desktop" src={habitinfoDesktop2} alt="habitinfoDesktop2" width={1200} height={400} ></Img>}
          <Img className="slide" src={habitinfo1} alt="habitinfo1" width={400} height={400} ></Img>
          <Img className="slide" src={habitinfo2} alt="habitinfo2" width={400} height={400} ></Img>
        </ImageWrapper>
        <ColWrapper>
          <SubText>월간 습관 실천 여부는 달력 형태로</SubText>
          <SubText>연간 실천 여부는 그래프로 확인 가능합니다.</SubText>
        </ColWrapper>
      </Section>
      <Section className="others">
        <Title>#other feature</Title>

        <Text>
          <span>암호화, 테마, 멀티 플랫폼 최적화 등</span>
          <span>추가적인 사용자 편의 기능을 제공합니다.</span>
        </Text>

        <RowWrapper>
          <ColWrapper className="othersIcons">
            <LockIcon fontSize="large" />
            <span>텍스트 암호화</span>
          </ColWrapper>
          <ColWrapper className="othersIcons">
            <ColorLensIcon fontSize="large" />
            <span>테마 설정</span>
          </ColWrapper>
          <ColWrapper className="othersIcons">
            <PhonelinkIcon fontSize="large" />
            <span>멀티 플랫폼</span>
          </ColWrapper>
        </RowWrapper>

        <ImageWrapper className="desktopNoScroll">
          <Img className="slide otherinfo" src={otherinfo1} alt="otherinfo1" width={300} height={300} ></Img>
          <Img className="slide otherinfo" src={otherinfo2} alt="otherinfo2" width={300} height={300} ></Img>
          <Img className="slide otherinfo" src={otherinfo3} alt="otherinfo3" width={300} height={300} ></Img>
        </ImageWrapper>
      </Section>
      <Section className="outro">
        <div>
          <Button onClick={installPwa}>앱 다운로드</Button>
          <Button onClick={() => (router.push('/app'))}>웹으로 시작</Button>
        </div>
        <Logo className="outro">
          <div>
            <span>ever</span><span>stamp</span>
          </div>
          <span>grow every day</span>
        </Logo>
      </Section>
    </Wrapper>
  );
}

export default Page;


const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-y: scroll;
`
const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: rgb(var(--greyTitle));
`
const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: rgb(var(--greyTitle));

  &.othersIcons{
    margin: 0 12px;
    span{
      font-size: 14px;
      font-weight: 500;
      margin-top: 8px;
      @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
        font-size: 16px;
      }
      @media (min-width:1024px) { //desktop
        font-size: 18px;
      }
    }
  }
`
const Section = styled.div`
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.intro, &.emotion, &.view, &.habit, &.others, &.outro{
    background-color: #EFF0F6;
    width: 100%;
    height: auto;
    padding: 56px 0;
    > *{
      margin: 24px 0;
    }
    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      padding: 64px 0;
      > *{
        margin: 28px 0;
      }
    }
    @media (min-width:1024px) { //desktop
      padding: 72px 0;
      > *{
        margin: 36px 0;
      }
    }
  }
  &.intro, &.view, &.others{
    background-color: white;
  }
  &.outro{
    background-color: #979FC7;
  }
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >div>span{
    display: inline-block;

    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 4px;
    color: rgb(var(--greyTitle));
    &::first-letter{
      color: #979FC7;
    }
    
  }
  >span{
    line-height: 1;
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    color: #EF9C92;
  }

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    >div>span{
      font-size: 28px;
    }
    >span{
      font-size: 20px;
    }
  }
  @media (min-width:1024px) { //desktop
    >div>span{
      font-size: 32px;
    }
    >span{
      font-size: 24px;
    }
  }

  &.outro{
    >div>span{
      &::first-letter{
        color: #EFF0F6;
      }
    }
    >span{
      color: #F6E388;
    }
  }
`
const Button = styled.button`
  box-shadow: 0px 0px 3px rgba(0,0,0,0.3);

  padding: 6px 16px;
  margin: 0 8px;
  border-radius: 32px;

  font-size: 14px;
  font-weight: 600;

  color: rgb(var(--greyTitle));
  background-color: #d7daeb;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 16px;
  }
  @media (min-width:1024px) { //desktop
    font-size: 18px;
  }
`
const Title = styled.span`
  color: #989FC4;
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 22px;
  }
  @media (min-width:1024px) { //desktop
    font-size: 24px;
  }
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span{
    font-size: 20px;
    font-weight: 600;
    color: rgb(var(--greyTitle));
    line-height: 1.4;

    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      font-size: 28px;
    }
    @media (min-width:1024px) { //desktop
      font-size: 32px;
      line-height: 1.5;
    }
  }
`
const SubText = styled.span`
  color: salmon;
  font-size: 14px;
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 16px;
  }
  @media (min-width:1024px) { //desktop
    font-size: 18px;
  }
`
const ImageWrapper = styled.div`
  width : 100dvw;
  overflow-x: scroll;
  display : flex;

  scroll-snap-type: x mandatory;
  padding: 12px 40dvw;

  @media (min-width:1024px) { //desktop
    padding: 12px 15dvw;
  }

  &.desktopNoScroll{
    @media (min-width:1024px) { //desktop
      padding: 12px 40dvw;
      justify-content: center;
      overflow-x: hidden;
    }
  }

`
const Img = styled(Image)`
  width: auto;
  &.emotionImg{
    width: 200px;
  }
  &.habitbox{
    box-shadow: 0px 0px 16px rgba(0,0,0,0.2);

    width: 200px;
    height: 200px;
    border-radius: 16px;
    background-color: white;
    margin: 0 4px;
    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      width: 240px;
      height: 240px;
    }
    @media (min-width:1024px) { //desktop
      width: 280px;
      height: 280px;
    }
  }
  &.slide{
    border-radius: 32px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.2);

    scroll-snap-align: center;
    scroll-snap-stop: always !important;
    margin: 0 16px;

    
    max-width: 100dvw;
    max-height: 70dvh;
    width: 60dvw;
    height: auto;
  }
  &.otherinfo{
    border-radius: 16px;
  }
  &.desktop{
    max-width: 80dvw;
    max-height: 70dvh;
    width: auto;
    height: auto;
  }
`