'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";


import calendarImg from '/public/img/intro/calendar.png';
import emotions2 from '/public/img/emotion/emotions2.png';
import habitbox from '/public/img/intro/habitbox.png';


import { useRouter } from "next/navigation";

import LockIcon from '@mui/icons-material/Lock';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PhonelinkIcon from '@mui/icons-material/Phonelink';


const Page = () => {

  const router = useRouter();

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
        <TextWrapper>
          <span>감정일기와 습관을 한곳에서 관리하고</span>
          <span>당신의 변화와 성장을 기록해보세요</span>
        </TextWrapper>

        <ImageWrapper>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
        </ImageWrapper>

        <div>
          <Button onClick={() => { alert('준비중입니다...') }}>앱 다운로드</Button>
          <Button onClick={() => (router.push('/app'))}>웹에서 실행</Button>
        </div>
      </Section>
      <Section className="emotion">
        <div className="title">#emotions</div>
        <div className="text">
          <span>나의 모든 감정을 솔직하게 기록하면</span>
          <span>나를 이해하고 사랑하는데 도움이 됩니다.</span>
          <span>함께 감정 일기를 시작해볼까요?</span>
        </div>
        <Image className="emotionImg" src={emotions2} alt="emotions2" width={700} height={700}></Image>
      </Section>
      <Section className="view">
        <span className="title">#view feature</span>
        <div className="text">
          <span>달력에서 감정과 습관 성취를 한눈에,</span>
          <span>목록에서 시간순으로 편하게 확인하세요.</span>
          {/* <span>살펴보세요</span> */}
        </div>
        <ImageWrapper>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
        </ImageWrapper>
      </Section>
      <Section className="habit">
        <span className="title">#habit feature</span>
        <div className="text">
          <span>매일의 습관을 기록하며</span>
          <span>목표를 향해 한걸음씩 나아가세요.</span>
          <span>작은 변화가 큰 차이를 만듭니다.</span>
        </div>
        <RowWrapper>
          <Img className="habitbox" src={habitbox} alt="habitbox" width={300} height={300} priority></Img>
        </RowWrapper>
        <div className="text">
          <span>매달 성취 결과를 달력으로 한눈에,</span>
          <span>매년 성취 결과를 차트로 한눈에 확인하세요.</span>
        </div>
        <ImageWrapper>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={300} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={300} height={700} priority></Img>
        </ImageWrapper>
      </Section>
      <Section className="others">
        <span className="title">#other feature</span>
        <RowWrapper>
          <ColWrapper className="othersIcons">
            <LockIcon fontSize="large" />
            <span>텍스트 암호화</span>
          </ColWrapper>
          <ColWrapper className="othersIcons">
            <ColorLensIcon fontSize="large" />
            <span>유저 테마 설정</span>
          </ColWrapper>
          <ColWrapper className="othersIcons">
            <PhonelinkIcon fontSize="large" />
            <span>멀티 플랫폼</span>
          </ColWrapper>
        </RowWrapper>
        <ImageWrapper>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
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
    }
  }
`

const ImageWrapper = styled.div`
  width : 100dvw;
  overflow-x: scroll;
  display : flex;

  scroll-snap-type: x mandatory;
  padding: 12px 40dvw;

  /* scroll-snap-align: start;
  scroll-snap-stop: always !important; */
`
const Button = styled.button`
  padding: 6px 16px;
  margin: 0 4px;
  border-radius: 32px;

  font-size: 14px;
  font-weight: 600;

  color: rgb(var(--greyTitle));
  background-color: #d7daeb;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span{
    color: rgb(var(--greyTitle));
    font-size: 20px;
    font-weight: 600;
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

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-y: scroll;
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

    > *{
      margin: 20px 0;
      &:nth-child(2){
        margin-top: 68px;
      }
      &:last-child{
        margin-bottom: 68px;
      }
    }

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
  &.emotion, &.view, &.habit, &.others, &.outro{
    background-color: #EFF0F6;
    width: 100%;
    height: auto;
    padding: 48px 0;
    .emotionImg{
      width: 200px;
    }
    > *{
      margin: 20px 0;
    }
  }
  &.view, &.others{
    background-color: white;
  }
  &.outro{
    background-color: #979FC7;
  }

  .title{
    color: #989FC4;
    font-size: 20px;
    font-weight: 500;
    text-transform: uppercase;
  }
  .text{
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
      font-size: 20px;
      font-weight: 600;
      color: rgb(var(--greyTitle));
      line-height: 1.3;
    }
  }
`

const Img = styled(Image)`
  width: auto;
  &.calendar{
    width: 180px;
    border-radius: 16px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.1);
  }
  &.habitbox{
    box-shadow: 0px 0px 12px rgba(0,0,0,0.1);

    width: 200px;
    height: 200px;
    border-radius: 16px;
    background-color: white;
    margin: 0 4px;
  }
  &.slide{
    border-radius: 16px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.1);

    max-width: 60dvw;
    max-height: 80dvh;
    width: 60dvw;

    scroll-snap-align: center;
    scroll-snap-stop: always !important;
    margin: 0 16px;
  }
`