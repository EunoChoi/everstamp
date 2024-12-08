'use client';

import Image from "next/image";
import styled from "styled-components";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Axios from "@/Axios/axios";
import { useEffect } from "react";


//function
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { getCurrentUser } from "@/function/fetch/user";


//images
import emotions from '/public/img/emotion/emotions.png';
import google from '/public/img/loginIcon/google.png';
import kakao from '/public/img/loginIcon/kakao.png';
import naver from '/public/img/loginIcon/naver.png';


/**
 * [Client] login page, url : 'everstamp.site/app/'
 */
const Page = () => {
  const router = useRouter();

  const { data: user, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: "always",

    staleTime: 0,
    gcTime: 0,
    retry: 1,
  })

  const start = () => {
    router.push(`app/calendar?date=${getCleanTodayTime()}`);
  }
  const logout = () => {
    Axios.get('user/logout').then(() => {
      signOut();
    });
  }

  useEffect(() => {
    router.prefetch('/app/calendar');
    router.prefetch('/app/list');
    router.prefetch('/app/habit');
    router.prefetch('/app/setting');
  }, [])

  const options = { callbackUrl: '/app' };
  return (
    <Wrapper>
      <Logo>
        <div className="main">
          <span>everstamp</span>
        </div>
      </Logo>

      <Img src={emotions} priority width={400} height={400} alt='emotions'></Img>

      {/* <TextContent>
        <span>매일 매일 함께 성장해요!</span>
      </TextContent> */}
      {isSuccess ?
        <LoggedInButtonWrapper >
          <LoggedInButtonStart className={user?.provider} onClick={start}>
            {user?.provider === 'google' && <Image src={google} alt='google' width={24} height={24} />}
            {user?.provider === 'kakao' && <Image src={kakao} alt='kakao' width={24} height={24} />}
            {user?.provider === 'naver' && <Image src={naver} alt='naver' width={24} height={24} />}
            <span>{user?.email}</span></LoggedInButtonStart>
          <LoggedInButtonLogout onClick={logout}>다른 SNS 계정 선택</LoggedInButtonLogout>
        </LoggedInButtonWrapper>
        :
        <Buttons>
          <LoginButton
            className="google"
            onClick={() => signIn('google', options, { prompt: 'consent' })}>
            <SnsImage src={google} alt='google' width={50} height={50} />
          </LoginButton>
          <LoginButton
            className="kakao"
            onClick={() => signIn('kakao', options, { prompt: 'select_account' })}>
            <SnsImage src={kakao} alt='kakao' width={50} height={50} />
          </LoginButton>
          <LoginButton
            className="naver"
            onClick={() => signIn('naver', options)}>
            <SnsImage src={naver} alt='naver' width={50} height={50} />
          </LoginButton>
        </Buttons>}
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
  width: 350px;
  @media (max-width: 479px) { //mobile port
    margin: 32px 0;
    width: 70dvw;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: auto;
    height: 156px;
  }
  @media (min-width:1024px) { //desktop
    margin: 30px 0;
  }
`;
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  span{
    text-align: center;
    color: rgb(var(--greyTitle));
    font-weight: 500;
    line-height: 100%;    
  }
  @media (max-width: 479px) { //mobile port
    span{ font-size: 20px; }
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
      /* text-transform: capitalize; */
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
        font-size: 36px;
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
        font-size: 48px;
      }
    }
    .sub{
      font-size: 20px;
    }
  }
`
const LoggedInButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LoggedInButtonStart = styled.button`
  display: flex;
  justify-content: start;
  align-items: center;

  width : auto;
  max-width: 90dvw;
  overflow-x: scroll;

  height: 42px;
  border-radius: 42px;
  border : 2px solid rgba(0,0,0,0.1);
  padding: 0 28px;
  margin-bottom: 24px;

  background-color:#fff;
  color: rgb(var(--greyTitle));
  text-transform: lowercase;
  font-size: 16px;
  font-weight: 500;

  span{
    margin-left : 8px;
    white-space: nowrap;
  }  
  
  &.google{
    background-color:#fff;
  }
  &.kakao{
    background-color:rgb(250, 225, 0);
    color: #39181D;
  }
  &.naver{
    background-color: rgb(2, 199, 60);
    color: white;
  }


  @media (min-width:1024px) { //desktop
    height: 48px;
    /* margin: 6px; */
  }
`
const LoggedInButtonLogout = styled.button`
  color: rgb(var(--greyTitle));
  font-size: 14px;
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

const SnsImage = styled(Image)`
  width: 70%;
  height: 70%;
  object-fit: cover;
`