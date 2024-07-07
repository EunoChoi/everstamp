'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";


import calendarImg from '/public/img/intro/calendar.png';
import emotions2 from '/public/img/emotion/emotions2.png';
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
        <span className="title">#diary</span>
        <div className="text">
          <span>달력뷰 리스트뷰 어쩌구</span>
          <span>5가지 감정을 사용 가능</span>
          <span>감정 어쩌구 저쩌구 저쩌구</span>
        </div>
        <ImageWrapper>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={700} height={700} priority></Img>
        </ImageWrapper>
      </Section>
      <Section className="habit">
        <span className="title">#habit</span>
        <div className="text">
          <span>습관 3단계 중요도</span>
          <span>최대 18개 생성가능</span>
          <span>4일내 체크 가능</span>
        </div>
        <RowWrapper>
          <div className="dummy"></div>
          <div className="dummy"></div>
          <div className="dummy"></div>
        </RowWrapper>
        <div className="text">
          <span>월간 보기 설명</span>
          <span>연간 보기 설명</span>
        </div>
        <ImageWrapper>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={300} height={700} priority></Img>
          <Img className="slide" src={calendarImg} alt="calendarImg" width={300} height={700} priority></Img>
        </ImageWrapper>
      </Section>
      <Section className="others">
        <span className="title">#others</span>
        <RowWrapper>
          <ColWrapper className="othersIcons">
            <LockIcon fontSize="large" />
            <span>일기 암호화</span>
          </ColWrapper>
          <ColWrapper className="othersIcons">
            <ColorLensIcon fontSize="large" />
            <span>유저 테마</span>
          </ColWrapper>
          <ColWrapper className="othersIcons">
            <PhonelinkIcon fontSize="large" />
            <span>멀티 플랫폼</span>
          </ColWrapper>
        </RowWrapper>
        {/* <div className="text">
          <span>기타 특징 설명</span>
          <span>보안, 커스텀, 크로스</span>
        </div> */}
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

  .dummy{
    width: 110px;
    height: 110px;
    border-radius: 8px;
    background-color: white;
    margin: 0 4px;
  }
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
  padding: 4px 16px;
  margin: 0 4px;
  border-radius: 32px;

  font-size: 14px;
  font-weight: 500;

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
    line-height: 1;
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