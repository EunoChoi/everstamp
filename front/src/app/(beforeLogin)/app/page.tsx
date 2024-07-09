'use client';

import Image from "next/image";
import styled from "styled-components";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

import emotions from '/public/img/emotion/emotions.png';
import { signIn } from "next-auth/react";

import google from '/public/img/google.png';
import kakao from '/public/img/kakao.png';
import naver from '/public/img/naver.png';
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { useRouter } from "next/navigation";


const Page = () => {
  const router = useRouter();
  const options = { callbackUrl: `/app/calendar?date=${getCleanTodayTime()}` };
  return (
    <Wrapper>
      <Logo>
        <span>ever</span>
        <span>stamp</span>
        <span className="sub">grow every day</span>
      </Logo>

      <Img src={emotions} priority width={400} height={400} alt='emotions'></Img>

      <TextContent>
        <span>감정 일기를 적고 습관을 실천하세요.</span>
        <span>당신의 긍정적 변화와 성장을 응원합니다.</span>
      </TextContent>
      <Buttons>
        <LoginButton
          className="google"
          onClick={() => signIn('google', options, { prompt: 'consent' })}>
          <Images src={google} alt='google' width={50} height={50} />
        </LoginButton>
        <LoginButton
          className="kakao"
          onClick={() => signIn('kakao', options, { prompt: 'select_account' })}>
          <Images src={kakao} alt='kakao' width={50} height={50} />
        </LoginButton>
        <LoginButton
          className="naver"
          onClick={() => signIn('naver', options)}>
          <Images src={naver} alt='naver' width={50} height={50} />
        </LoginButton>
      </Buttons>
      <BackButton onClick={() => router.push('/')}>
        <ArrowBackIcon />
        <span>Intro</span>
      </BackButton>
    </Wrapper>
  );
}

export default Page;

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;

  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;

  background-color: #EFF0F6;

 
  @media (max-width: 479px) { //mobile port
    >*{ margin: 28px  0; }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    >*{ margin: 12px  0; }
  }
  @media (min-width:1024px) { //desktop
    >*{ margin: 32px  0; }
  }
`
const Img = styled(Image)`
  object-fit: contain;
  width: 300px;
`;
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  span{
    text-align: center;
    color: rgb(var(--greyTitle));
    font-weight: 600;
    line-height: 130%;    
  }
  @media (max-width: 479px) { //mobile port
    span{ font-size: 18px; }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    span{ font-size: 16px; }
  }
  @media (min-width:1024px) { //desktop
    span{ font-size: 20px; }
  }
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink : 0;
  span {
    font-weight: 700;
    text-transform: uppercase;
    line-height: 100%;
    text-align: center;
    color: rgb(var(--greyTitle));
  }
  span::first-letter{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  .sub{
    margin-top: 12px;
    font-size: 14px;
    font-weight: 600;
    color: #EF9C92 !important;
    text-transform: capitalize;
    &::first-letter{
    color: #EF9C92;
    }
  }
  @media (max-width: 479px) { //mobile port
    font-size: 42px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 32px;
  }
  @media (min-width:1024px) { //desktop
    font-size: 56px;
  }
`
// const Button = styled.button`
//   cursor: pointer;

//   background-color : #979FC7;
//   color: #EFF0F6;
//   font-size: 16px;
//   font-weight: 600;
//   text-transform: uppercase;

//   padding: 4px 20px;
//   border-radius: 48px;
//   @media (min-width:1024px) { //desktop
//     font-size: 18px;
//   }
// `
const Buttons = styled.div`
  display: flex;
`
const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width : 42px;
  height: 42px;
  border-radius: 42px;
  border : 2px solid rgba(0,0,0,0.1);
  margin: 4px;

  @media (min-width:1024px) { //desktop
    width : 56px;
    height: 56px;
    margin: 6px;
  }

  &.kakao{
    background-color: rgb(250, 225, 0);
  }
  &.naver{
    background-color: rgb(2, 199, 60);
  }
  &.google{
    background-color: white;
  }
`
const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  color: grey;
  span{
    line-height: 0;
    font-weight: 500;
    margin-left: 4px;
  }
`
const Images = styled(Image)`
  width: 70%;
  height: 70%;
  object-fit: cover;
`