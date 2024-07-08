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


const Page = () => {

  const router = useRouter();
  const isMobile = IsMobile();

  if (isMobile == null) return <></>;

  return (
    <Wrapper>
      <Section className="intro">
        <div className="topBar">
          <span>git</span>
          <span>velog</span>
        </div>
        <Logo>
          <div>
            <span>ever</span><span>stamp</span>
          </div>
          <span>grow every day</span>
        </Logo>
        <Text>
          <span>감정일기와 습관을 한곳에서 관리하고</span>
          <span>당신의 변화와 성장을 기록해보세요.</span>
        </Text>

        <ImageWrapper>
          {isMobile || <Img className="slide desktop" src={habitinfoDesktop1} alt="habitinfoDesktop1" width={1200} height={400} priority></Img>}
          {isMobile || <Img className="slide desktop" src={listDesktop} alt="calendar" width={1200} height={400} priority></Img>}
          <Img className="slide" src={calendar} alt="calendar" width={400} height={400} priority></Img>
          <Img className="slide" src={list} alt="list" width={400} height={400} ></Img>
          <Img className="slide" src={zoom1} alt="zoom1" width={400} height={400} ></Img>
          <Img className="slide" src={zoom2} alt="zoom2" width={400} height={400} ></Img>
          <Img className="slide" src={habit} alt="habit" width={400} height={400} ></Img>
          <Img className="slide" src={habitinfo1} alt="habitinfo1" width={400} height={400} ></Img>
          <Img className="slide" src={habitinfo2} alt="habitinfo2" width={400} height={400} ></Img>
          <Img className="slide" src={setting} alt="setting" width={400} height={400} ></Img>
        </ImageWrapper>

        <div>
          <Button onClick={() => { alert('준비중입니다...') }}>앱 다운로드</Button>
          <Button onClick={() => (router.push('/app'))}>웹에서 실행</Button>
        </div>
      </Section>
      <Section className="emotion">
        <Title>#emotions</Title>
        <Text>
          <span>나의 모든 감정을 솔직하게 기록하면</span>
          <span>나를 이해하고 사랑하는데 도움이 됩니다.</span>
          <span>함께 감정 일기를 시작해볼까요?</span>
        </Text>
        <Img className="emotionImg" src={emotions2} alt="emotions2" width={300} height={300}></Img>
      </Section>
      <Section className="view">
        <Title>#diary feature</Title>
        <Text>
          <span>달력에서 감정과 습관 성취를 한눈에,</span>
          <span>목록에서 시간순으로 편하게 확인하세요.</span>
        </Text>
        <ImageWrapper>
          {isMobile || <Img className="slide desktop" src={listDesktop} alt="calendar" width={1200} height={400}></Img>}
          <Img className="slide" src={calendar} alt="calendar" width={400} height={400} ></Img>
          <Img className="slide" src={list} alt="list" width={400} height={400} ></Img>
          <Img className="slide" src={zoom1} alt="zoom1" width={400} height={400} ></Img>
          <Img className="slide" src={zoom2} alt="zoom2" width={400} height={400} ></Img>
        </ImageWrapper>
      </Section>
      <Section className="habit">
        <Title>#habit feature</Title>
        <Text>
          <span>매일의 습관을 기록하며</span>
          <span>목표를 향해 한걸음씩 나아가세요.</span>
          <span>작은 변화가 큰 차이를 만듭니다.</span>
        </Text>
        <RowWrapper>
          <Img className="habitbox" src={habitbox} alt="habitbox" width={400} height={400}></Img>
        </RowWrapper>
        <Text>
          <span>매달 성취 결과를 달력으로 한눈에,</span>
          <span>매년 성취 결과를 차트로 한눈에 확인하세요.</span>
        </Text>
        <ImageWrapper>
          {isMobile || <Img className="slide desktop" src={habitinfoDesktop1} alt="habitinfoDesktop1" width={1200} height={400} ></Img>}
          {isMobile || <Img className="slide desktop" src={habitinfoDesktop2} alt="habitinfoDesktop2" width={1200} height={400} ></Img>}
          <Img className="slide" src={habitinfo1} alt="habitinfo1" width={400} height={400} ></Img>
          <Img className="slide" src={habitinfo2} alt="habitinfo2" width={400} height={400} ></Img>
        </ImageWrapper>
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
          <Img className="slide" src={otherinfo1} alt="otherinfo1" width={300} height={300} ></Img>
          <Img className="slide" src={otherinfo2} alt="otherinfo2" width={300} height={300} ></Img>
          <Img className="slide" src={otherinfo3} alt="otherinfo3" width={300} height={300} ></Img>
        </ImageWrapper>
      </Section>
      <Section className="outro">
        <div>
          <Button onClick={() => { alert('준비중입니다...') }}>앱 다운로드</Button>
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

  &.intro{
    padding-top: 32px;
    background-color: white;
    justify-content: space-evenly;
    position: relative;

    .topBar{
      display: flex;
      justify-content: start;
      align-items: center;
      width: 100%;
      height: 32px;
      background-color : #979FC7;
      margin: 0;

      position: absolute;
      top: 0;
      span{
        text-transform: uppercase;
        color: rgb(var(--greyTitle));
        color: #EFF0F6;
        font-size: 12px;
        font-weight: 500;
        margin-left: 16px;
      }
    }
  }
  &.intro, &.emotion, &.view, &.habit, &.others, &.outro{
    background-color: #EFF0F6;
    width: 100%;
    height: auto;
    padding: 56px 0;
    > *{
      margin: 20px 0;
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
    border-radius: 16px;
    box-shadow: 0px 0px 16px rgba(0,0,0,0.2);

    scroll-snap-align: center;
    scroll-snap-stop: always !important;
    margin: 0 16px;

    
    max-width: 100dvw;
    max-height: 80dvh;
    width: 60dvw;
    height: auto;
  }
  &.desktop{
    max-width: 80dvw;
    max-height: 80dvh;
    width: auto;
    height: auto;
  }
`