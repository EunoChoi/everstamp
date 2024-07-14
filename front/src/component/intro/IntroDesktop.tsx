'use client';


import ImageCarousel from "../common/ImageCarousel";

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


import emotions2 from '/public/img/emotion/emotions2.png';
import habitbox from '/public/img/intro/habitbox.png';
import otherinfo1 from '/public/img/intro/otherinfo1.png';
import otherinfo2 from '/public/img/intro/otherinfo2.png';
import otherinfo3 from '/public/img/intro/otherinfo3.png';



import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const IntroDesktop = () => {

  const introImages = [calendar, list, habit, habitinfo2, habitinfoDesktop1, listDesktop,];
  const viewImages = [calendar, list, zoom1, zoom2, listDesktop];
  const habitImages = [habitinfo1, habitinfo2, habitinfoDesktop1, habitinfoDesktop2];

  const router = useRouter();

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

  return <Wrapper>
    <Desktop_Section className="intro">
      <section>
        <Logo>
          <div>
            <span>ever</span><span>stamp</span>
          </div>
          <span>grow every day</span>
        </Logo>
        <Text>
          <span>꾸준히 감정 일기를 작성하고</span>
          <span>목표 습관을 실천하세요.</span>
          <span>당신의 변화와 성장을 응원합니다 :)</span>
        </Text>
        <div>
          <Button onClick={installPwa}>앱 다운로드</Button>
          <Button onClick={() => (router.push('/app'))}>웹에서 실행</Button>
        </div>
        <ColWrapper>
          <SubText>쾌적한 이용을 위해 앱을 설치해 주세요.</SubText>
          <SubText>웹 브라우저 환경에 따라 레이아웃이 어긋날 수 있습니다.</SubText>
          <SubText>{`* 앱 다운로드 : '메뉴(공유하기) -> 홈 화면에 추가'`}</SubText>
        </ColWrapper>
      </section>
      <section>
        <ImageCarousel images={introImages} keyValue="intro" type="fullWidth" width="100%" height="85%" borderRadius="28px" />
      </section>
    </Desktop_Section>
    <Desktop_Section className="emotion">
      <section>
        <Img className="emotionImg" src={emotions2} alt="emotions2" width={300} height={300}></Img>
      </section>
      <section>
        <Title>#emotions</Title>
        <Text>
          <span>나의 감정을 정리하면</span>
          <span>나를 이해하고 사랑하게 됩니다.</span>
          <span>감정 일기를 시작해볼까요?</span>
        </Text>
        <ColWrapper>
          <SubText>'기쁨', '행복', '무난한 감정', '슬픔', '분노'</SubText>
          <SubText>5가지 감정 선택을 지원합니다.</SubText>
        </ColWrapper>
      </section>
    </Desktop_Section>
    <Desktop_Section className="view">
      <section>
        <Title>#view feature</Title>
        <Text>
          <span>일기, 감정, 습관 목록을</span>
          <span>한눈에 확인 하세요.</span>
        </Text>
        <ColWrapper>
          <SubText>리스트 뷰에서 감정별 모아보기와</SubText>
          <SubText>날짜별 오름/내림 차순 정렬을 지원합니다.</SubText>
        </ColWrapper>
      </section>
      <section>
        <ImageCarousel images={viewImages} keyValue="view" type="fullWidth" width="100%" height="85%" borderRadius="28px" />
      </section>
    </Desktop_Section>
    <Desktop_Section className="habit small">
      <section>
        <Img className="habitbox" src={habitbox} alt="habitbox" width={300} height={300}></Img>
      </section>
      <section>
        <Title>#habit feature</Title>
        <Text>
          <span>작은 변화가 큰 차이를 만듭니다.</span>
          <span>매일 실천한 습관들을 기록하세요.</span>
        </Text>
        <ColWrapper>
          <SubText>습관 목록은 최대 18개까지 생성 가능하며</SubText>
          <SubText>최근 4일 동안만 완료 여부를 선택할 수 있습니다.</SubText>
        </ColWrapper>
      </section>
    </Desktop_Section>
    <Desktop_Section className="habit">
      <section>
        <ImageCarousel images={habitImages} keyValue="habit" type="fullWidth" width="100%" height="85%" borderRadius="28px" />
      </section>
      <section>
        <Title>#habit view feature</Title>
        <Text>
          <span>습관이 형성되는 시간 21일</span>
          <span>실천 결과를 확인하고 점검하세요.</span>
        </Text>
        <ColWrapper>
          <SubText>월간 습관 실천 여부는 달력 형태로</SubText>
          <SubText>연간 실천 여부는 그래프로 확인 가능합니다.</SubText>
        </ColWrapper>
      </section>
    </Desktop_Section>
    <Desktop_Section className="others center">
      <Title>#other feature</Title>
      <Text>
        <span>암호화, 테마, 멀티 플랫폼 최적화 등</span>
        <span>추가적인 사용자 편의 기능을 제공합니다.</span>
      </Text>
      <ImageWrapper>
        <Img className="otherinfo" src={otherinfo1} alt="otherinfo1" width={300} height={300} priority></Img>
        <Img className="otherinfo" src={otherinfo2} alt="otherinfo2" width={300} height={300} priority></Img>
        <Img className="otherinfo" src={otherinfo3} alt="otherinfo3" width={300} height={300} ></Img>
      </ImageWrapper>
    </Desktop_Section>
    <Desktop_Section className="outro center">
      <div>
        <Button onClick={installPwa}>앱 다운로드</Button>
        <Button onClick={() => (router.push('/app'))}>실행하기</Button>
      </div>
      <Logo className="outro">
        <div>
          <span>ever</span><span>stamp</span>
        </div>
        <span>grow every day</span>
      </Logo>
    </Desktop_Section>
  </Wrapper >;
}

export default IntroDesktop;


//desktop
const Desktop_Section = styled.section`
  height: 95dvh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 10dvw;

  &.intro, &.view, &.others{
    background-color: #fff;
  }
  &.emotion, &.habit{
    background-color: #EFF0F6;
  }
  &.outro{
    height: 50dvh;
    background-color: #979FC7;
  }
  &.small{
    height: 60dvh;
  }

  >section{
    width: 50%; 
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > *{ margin : 32px 0; }
  }

  &.center{
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > *{ margin : 32px 0; }
  }
`

//common
const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-y: scroll;
`

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: rgb(var(--greyTitle));
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >div>span{
    display: inline-block;
    font-size: 32px;
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
    font-size: 22px;
    font-weight: 600;
    text-transform: capitalize;
    color: #EF9C92;
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
const Title = styled.span`
  color: #989FC4;
  font-size: 24px;
  font-weight: 500;
  text-transform: capitalize;
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span{
    font-size: 32px;
    font-weight: 600;
    color: rgb(var(--greyTitle));
    line-height: 1.4;
    white-space: nowrap;
  }
`
const Button = styled.button`
  border: 3px solid rgba(0,0,0,0.1);
  border-radius: 32px;
  padding: 6px 24px;

  width: 140px;

  font-size: 18px;
  font-weight: 600;


  color: rgb(var(--greyTitle));
  background-color: #d7daeb;

  &:first-child{
    margin-right: 14px;
  }
`
const SubText = styled.span`
  color: grey;
  font-size: 16px;
`
const ImageWrapper = styled.div`
  width : 100%;
  display : flex;
  justify-content: center;
  padding: 12px 0;
`
const Img = styled(Image)`
  width: auto;
  &.emotionImg{
    width: 350px;
  }
  &.habitbox{
    box-shadow: 0px 0px 16px rgba(0,0,0,0.2);

    width: 300px;
    height: 300px;
    border-radius: 16px;
    background-color: white;
    margin: 0 4px;
  }
  &.otherinfo{
    width: 220px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.2);
    border-radius: 16px;
    margin: 0 16px;
  }
`
