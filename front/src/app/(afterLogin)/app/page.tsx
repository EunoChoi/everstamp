'use client';

import Image from "next/image";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

//function
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { getCurrentUser } from "../_lib/user";


//images
import emotions from '/public/img/emotion/emotions.png';
import google from '/public/img/loginIcon/google.png';
import kakao from '/public/img/loginIcon/kakao.png';
import naver from '/public/img/loginIcon/naver.png';


const Page = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })
  console.log(data.provider);


  const options = { callbackUrl: `/app/calendar?date=${getCleanTodayTime()}` };
  return (
    <Wrapper>
      <Logo>
        <div className="main">
          <span>ever</span>
          <span>stamp</span>
        </div>
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
      {/* <BackButton onClick={() => router.push('/')}>
        <ArrowBackIcon />
        <span>Intro</span>
      </BackButton> */}
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
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: auto;
    height: 50px;
  }
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
    span{ font-size: 16px; }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    span{ font-size: 14px; }
  }
  @media (min-width:1024px) { //desktop
    span{ font-size: 20px; }
  }
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink : 0;

  .main{
    display: flex;
    flex-direction: column;

    span {
      margin: 0 4px;
      font-weight: 700;
      text-transform: uppercase;
      line-height: 100%;
      text-align: center;
      color: rgb(var(--greyTitle));
    }
    span::first-letter{
      color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    }
  }
  
  .sub{
    font-weight: 600;
    color: #EF9C92;
    text-transform: capitalize;
  }

  @media (max-width: 479px) { //mobile port
    .main{
      span{
        font-size: 42px;
      }
    }
    .sub{
      font-size: 16px;
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    .main{
      flex-direction: row;
      span{
        font-size: 32px;
      }
    }
    .sub{
      font-size: 18px;
    }
  }
  @media (min-width:1024px) { //desktop
    .main{
      span{
        font-size: 56px;
      }
    }
    .sub{
      font-size: 20px;
    }
  }
`
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