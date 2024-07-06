'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";


import calendarImg from '/public/img/intro/calendar.png';
import emotions2 from '/public/img/emotion/emotions2.png';
import { useRouter } from "next/navigation";


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
        <Img className="calendar" src={calendarImg} alt="calendarImg" width={300} height={700} priority></Img>
        <div>
          <Button>앱 다운로드</Button>
          <Button onClick={() => (router.push('/app'))}>웹으로 시작</Button>
        </div>
      </Section>
      <Section className="emotion">
        <div className="title">#emotion</div>
        <div className="text">
          <span>감정을 기록해요</span>
          <span>5가지 감정을 사용 가능</span>
          <span>감정 어쩌구 저쩌구 저쩌구</span>
        </div>
        <Image className="emotionImg" src={emotions2} alt="emotions2" width={700} height={700}></Image>
      </Section>
      <Section className="view">
        <span className="title">#view</span>
        <div className="text">
          <span>달력뷰 리스트뷰 어쩌구</span>
          <span>5가지 감정을 사용 가능</span>
          <span>감정 어쩌구 저쩌구 저쩌구</span>
        </div>
        <Img className="calendar" src={calendarImg} alt="calendarImg" width={300} height={700} priority></Img>
      </Section>
      <Section className="habit">
        <span className="title">#habit</span>
        <div className="text">
          <span>습관 어쩌구 저쩌구</span>
          <span>습관 어쩌구 최대 18개 생성가능</span>
        </div>
        <Img className="calendar" src={emotions2} alt="calendarImg" width={300} height={700} priority></Img>
        <div className="text">
          <span>월간 보기 설명</span>
          <span>연간 보기 설명</span>
        </div>
        <Img className="calendar" src={calendarImg} alt="calendarImg" width={300} height={700} priority></Img>
      </Section>
      <Section className="others">
        <span className="title">#others</span>
        <div className="text">
          <span>기타 특징 설명</span>
          <span>보안, 커스텀, 크로스</span>
        </div>
      </Section>
      <Section className="outro">
        <div>
          <Button>앱 다운로드</Button>
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

const Button = styled.button`
  padding: 4px 16px;
  margin: 0 4px;
  border-radius: 32px;

  font-size: 14px;
  font-weight: 500;

  color: rgb(var(--greyTitle));
  background-color: #EFF0F6;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span{
    color: rgb(var(--greyTitle));
    font-size: 16px;
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
    font-size: 18px;
    font-weight: 500;
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
    padding-top: 5dvh;
    height: 98dvh;
    background-color: white;

    justify-content: space-evenly;
    position: relative;
    .topBar{
      display: flex;
      justify-content: start;
      align-items: center;
      width: 100%;
      height: 5dvh;
      background-color : #979FC7;

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
    padding: 32px 0;
    .emotionImg{
      width: 200px;
    }
    > *{
      margin: 16px 0;
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
    font-size: 18px;
    font-weight: 500;
  }
  .text{
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
      font-size: 24px;
      font-weight: 600;
      color: rgb(var(--greyTitle));
      line-height: 1.1;
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
`