'use client';

import { useQuery } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";


//function
import { getCurrentUser } from "@/common/fetchers/user";
import { getTodayString } from "@/common/functions/getTodayString";


//images
import Api from "@/api/Api";
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
    router.push(`/app/calendar?date=${getTodayString()}`);
  }
  const logout = () => {
    Api.get('user/logout').then(() => {
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
      <Logo>everstamp</Logo>
      <Img src={emotions} priority width={400} height={400} alt='emotions'></Img>
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
  @keyframes fadeIn {
    0% { opacity:0; }
    100% { opacity:1; }
  }
  >*{
    animation: fadeIn 1000ms ease-in-out;
  }

  width: 100dvw;
  height: 100dvh;

  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;

  background-color: #EFF0F6;

  @media (max-width: 479px) { //mobile port
    gap: 28px;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    gap: 20px;
  }
  @media (min-width:1025px) { //desktop
    gap: 32px;
  }
`
const Img = styled(Image)`
  object-fit: contain;
  
  @media (max-width: 479px) { //mobile port
    margin: 32px 0;
    width: 70dvw;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    width: auto;
    height: 128px;
  }
  @media (min-width:1025px) { //desktop
    width: 300px;
    margin: 30px 0;
  }
`;

const Logo = styled.span`
  text-transform: uppercase;
  line-height: 100%;
  color: rgb(var(--greyTitle));
  font-family: BMJUA;

  &:first-letter{
    color: ${(props) => props.theme.themeColor ? props.theme.themeColor : '#979FC7'};
  }

  @media (max-width: 479px) { //mobile port
    font-size: 36px;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    font-size: 32px;
  }
  @media (min-width:1025px) { //desktop
    font-size: 48px;
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
  /* font-weight: 500; */

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


  @media (min-width:1025px) { //desktop
    height: 48px;
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

  @media (min-width:1025px) { //desktop
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