import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import calendar from '/public/img/intro/calendar.png';
import list from '/public/img/intro/list.png';
import zoom1 from '/public/img/intro/zoom1.png';
import zoom2 from '/public/img/intro/zoom2.png';
import habit from '/public/img/intro/habit.png';
import habitinfo1 from '/public/img/intro/habitinfo1.png';
import habitinfo2 from '/public/img/intro/habitinfo2.png';


import emotions2 from '/public/img/emotion/emotions2.png';
import habitbox from '/public/img/intro/habitbox.png';
import otherinfo1 from '/public/img/intro/otherinfo1.png';
import otherinfo2 from '/public/img/intro/otherinfo2.png';
import otherinfo3 from '/public/img/intro/otherinfo3.png';

import LockIcon from '@mui/icons-material/Lock';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import ImageCarousel from "../common/ImageCarousel";

const IntroMobile = () => {
  const router = useRouter();

  const introImages = [calendar, list, zoom1, habit, habitinfo2];
  const mobileViewImages = [calendar, list, zoom1, zoom2];
  const mobileHabitImages = [habitinfo1, habitinfo2];
  const otherInfoImages = [otherinfo1, otherinfo2, otherinfo3];

  //pwa
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
      alert(`이미 앱이 설치되어 있는 경우 혹은\n퀵 설치 기능을 지원하지 않는 브라우저입니다.\n \n '메뉴(공유하기)->홈 화면에 추가'를\n진행하여 앱을 설치해주세요.`);
    }
  }

  return (<Wrapper>
    <Mobile_Section className="intro">
      <Logo>
        <div>
          <span>ever</span><span>stamp</span>
        </div>
        <span>grow every day</span>
      </Logo>
      <Text>
        <span>감정 일기를 적고 목표 습관을 실천하세요.</span>
        <span>당신의 변화와 성장을 응원합니다.</span>
      </Text>
      <ImageCarousel images={introImages} keyValue="mobileIntro" type="fullWidth" width="100dvw" height="80dvh" borderRadius="28px" />
      <div>
        <Button onClick={installPwa}>앱 다운로드</Button>
        {/* <Button onClick={() => (router.push('/app'))}>실행하기</Button> */}
      </div>
      <ColWrapper>
        <SubText>{`앱 다운로드 : '메뉴(공유하기) -> 홈 화면에 추가'`}</SubText>
        <SubText>*로그인 화면이 나타나지 않는 경우, 앱을 재실행해 주세요.</SubText>
      </ColWrapper>
    </Mobile_Section>
    <Mobile_Section className="emotion">
      <Title>#emotions</Title>
      <Text>
        <span>감정과 생각을 정리하며 일기를 적어보세요.</span>
        <span>나를 이해하고 사랑하는데 도움이 됩니다.</span>
      </Text>
      <Img className="emotionImg" src={emotions2} alt="emotions2" width={300} height={300}></Img>
      <ColWrapper>
        <SubText>'기쁨', '행복', '무난한 감정', '슬픔', '분노'</SubText>
        <SubText>5가지 감정 선택을 지원합니다.</SubText>
      </ColWrapper>
    </Mobile_Section>
    <Mobile_Section className="view">
      <Title>#view feature</Title>
      <Text>
        <span>일기, 감정, 습관 목록을 한눈에!</span>
        <span>달력 뷰와 리스트 뷰를 이용하세요.</span>
      </Text>
      <ImageCarousel images={mobileViewImages} keyValue="mobileView" type="fullWidth" width="100%" height="80dvh" borderRadius="28px" />

      <ColWrapper>
        <SubText>리스트 뷰에서 감정별 모아보기와</SubText>
        <SubText>날짜별 오름/내림 차순 정렬을 지원합니다.</SubText>
      </ColWrapper>
    </Mobile_Section>
    <Mobile_Section className="habit">
      <Title>#habit feature</Title>
      <Text>
        <span>작은 변화가 큰 차이를 만듭니다.</span>
        <span>매일 실천한 습관들을 기록하세요.</span>
      </Text>
      <RowWrapper>
        <Img className="habitbox" src={habitbox} alt="habitbox" width={300} height={300}></Img>
      </RowWrapper>
      <ColWrapper>
        <SubText>습관 목록은 최대 18개까지 생성 가능하며</SubText>
        <SubText>최근 4일 동안만 완료 여부를 선택할 수 있습니다.</SubText>
      </ColWrapper>
      <span></span>
      <Title>#habit view feature</Title>
      <Text>
        <span>습관이 형성되는 시간 21일!</span>
        <span>실천 결과를 확인하고 점검하세요.</span>
      </Text>
      <ImageCarousel images={mobileHabitImages} keyValue="mobileHabit" type="fullWidth" width="100%" height="80dvh" borderRadius="28px" />
      <ColWrapper>
        <SubText>월간 습관 실천 여부는 달력 형태로</SubText>
        <SubText>연간 실천 여부는 그래프로 확인 가능합니다.</SubText>
      </ColWrapper>
    </Mobile_Section>
    <Mobile_Section className="others">
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

      <ImageCarousel images={otherInfoImages} keyValue="mobileOtherInfo" type="fullWidth" width="100%" height="50dvh" borderRadius="16px" />
    </Mobile_Section>
    <Mobile_Section className="outro">
      <div>
        <Button onClick={installPwa}>앱 다운로드</Button>
        {/* <Button onClick={() => (router.push('/app'))}>실행하기</Button> */}
      </div>
      <Logo className="outro">
        <div>
          <span>ever</span><span>stamp</span>
        </div>
        <span>grow every day</span>
      </Logo>
    </Mobile_Section>
  </Wrapper>);
}

export default IntroMobile;

//tablet + phone
const Mobile_Section = styled.div`
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
  }
  &.intro, &.view, &.others{
    background-color: white;
  }
  &.outro{
    background-color: #979FC7;
  }
`
//common
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

  &.left{
    align-items: start;
  }
  &.right{
    align-items: end;
  }

  &.othersIcons{
    margin: 0 12px;
    span{
      font-size: 14px;
      font-weight: 500;
      margin-top: 8px;
      @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
        font-size: 16px;
      }
    }
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

  &.left{
    align-items: start;
    span{
      margin: 0;
      margin-right: 8px;
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

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    >div>span{
      font-size: 28px;
    }
    >span{
      font-size: 20px;
    }
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
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &.left{
    align-items: start;
  }
  &.right{
    align-items: end;
  }

  span{
    font-size: 20px;
    font-weight: 600;
    color: rgb(var(--greyTitle));
    line-height: 1.4;

    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      font-size: 28px;
    }
  }
`
const Button = styled.button`
  border: 2px solid rgba(0,0,0,0.1);

  margin: 0 6px;
  padding: 6px 16px;
  width: 110px;
  border-radius: 32px;

  font-size: 14px;
  font-weight: 600;

  color: rgb(var(--greyTitle));
  background-color: #d7daeb;
`
const SubText = styled.span`
  color: grey;
  font-size: 14px;
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 16px;
  }
`

const Img = styled(Image)`
  width: auto;
  &.emotionImg{
    width: 200px;
    @media (min-width:1024px) { //desktop
      width: 350px;
    }
  }
  &.habitbox{
    box-shadow: 0px 0px 16px rgba(0,0,0,0.2);

    width: 240px;
    height: 240px;
    border-radius: 16px;
    background-color: white;
    margin: 0 4px;
  }
`





