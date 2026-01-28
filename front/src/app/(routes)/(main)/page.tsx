'use client';

import { useQuery } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";


import { getCurrentUser } from "@/common/fetchers/user";
import { getTodayString } from "@/common/functions/getTodayString";
import Api from "@/api/Api";
import google from '/public/img/loginIcon/google.png';
import kakao from '/public/img/loginIcon/kakao.png';
import naver from '/public/img/loginIcon/naver.png';
import emotionsImage from '/public/img/emotion/emotions.png';


// 로그인 페이지 컴포넌트
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
    router.push(`/calendar?date=${getTodayString()}`);
  }
  const logout = () => {
    Api.get('user/logout').then(() => {
      signOut();
    });
  }

  useEffect(() => {
    router.prefetch('/calendar');
    router.prefetch('/list');
    router.prefetch('/habit');
    router.prefetch('/setting');
  }, [router])

  const options = { callbackUrl: '/' };
  
  const loginProviders = [
    { id: 'google', name: '구글로 로그인', icon: google, signInOptions: { prompt: 'consent' } },
    { id: 'kakao', name: '카카오로 로그인', icon: kakao, signInOptions: { prompt: 'select_account' } },
    { id: 'naver', name: '네이버로 로그인', icon: naver, signInOptions: {} },
  ];

  const providerIcons: Record<string, typeof google> = {
    google,
    kakao,
    naver,
  };

  return (
    <Wrapper>
      <LeftSection>
        <EmotionImageWrapper>
          <Image
            src={emotionsImage}
            alt="emotions"
            width={1200}
            height={900}
            priority
            quality={100}
            unoptimized={false}
          />
        </EmotionImageWrapper>
        <Logo>TO:OK</Logo>
      </LeftSection>
      <RightSection>
        <TextSection>
          <GreetingTitle>툭! 오늘도 하나씩 :)</GreetingTitle>
          <GreetingSubTitle>
            <SubTitleLine>완벽한 하루가 아니어도 괜찮아요.</SubTitleLine>
            <SubTitleLine>발자국 하나만 남겨도 충분해요.</SubTitleLine>
          </GreetingSubTitle>
        </TextSection>
        {isSuccess ? (
          <LoggedInButtonWrapper>
            <LoggedInButtonStart className={user?.provider} onClick={start}>
              {user?.provider && (
                <Image 
                  src={providerIcons[user.provider]} 
                  alt={user.provider} 
                  width={24} 
                  height={24} 
                />
              )}
              <span>{user?.email}</span>
            </LoggedInButtonStart>
            <LoggedInButtonLogout onClick={logout}>다른 SNS 계정 선택</LoggedInButtonLogout>
          </LoggedInButtonWrapper>
        ) : (
          <Buttons>
            {loginProviders.map((provider) => (
              <LoginButton
                key={provider.id}
                className={provider.id}
                onClick={() => signIn(provider.id as 'google' | 'kakao' | 'naver', options, provider.signInOptions)}
              >
                <SnsImage src={provider.icon} alt={provider.id} width={24} height={24} />
              </LoginButton>
            ))}
          </Buttons>
        )}
      </RightSection>
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
  padding: 20px;
  gap: 48px;

  /* 가로 모드 또는 높이가 짧을 때 가로 배치 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 40px;
    gap: 48px;
    
    @media (min-width: 1025px) {
      padding: 60px;
      gap: 48px;
    }
  }
`

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  /* 가로 모드 또는 높이가 짧을 때 가운데 정렬 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  @media (min-width: 1025px) {
    gap: 20px;
  }
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  /* 가로 모드 또는 높이가 짧을 때 가운데 정렬 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    gap: 16px;
  }

  @media (min-width: 1025px) {
    gap: 40px;
  }
`

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  /* 가로 모드 또는 높이가 짧을 때 오른쪽 섹션 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  @media (min-width: 1025px) {
    gap: 40px;
  }
`

const EmotionImageWrapper = styled.div`
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    filter: brightness(1.1);
  }

  @media (max-width: 479px) {
    width: 70%;
    max-width: 280px;
  }

  @media (min-width: 480px) and (max-width: 1024px) {
    width: 75%;
    max-width: 350px;
  }

  @media (min-width: 1025px) {
    width: 85%;
    max-width: 450px;
  }

  /* 가로 모드 또는 높이가 짧을 때 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    width: 100%;
    max-width: 200px;
    margin: 0;
  }
`

const Logo = styled.span`
  line-height: 1.2;
  font-family: 'BMJUA';
  color: rgb(var(--greyTitle));

  &::first-letter {
    color: ${(props) => props.theme.themeColor ?? '#979FC7'};
  }

  @media (max-width: 479px) { //mobile port
    font-size: 48px;
  }
  @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
    font-size: 44px;
  }
  @media (min-width:1025px) { //desktop
    font-size: 56px;
  }

  /* 가로 모드 또는 높이가 짧을 때 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    font-size: 36px;
  }
`

const GreetingTitle = styled.h1`
  color: rgb(var(--greyTitle));
  text-transform: capitalize;
  font-size: 24px;
  font-family: 'BMJUA';
  margin: 0;
  text-align: center;
  line-height: 1.3;
  
  @media (min-width: 480px) {
    font-size: 26px;
  }
  
  @media (min-width: 1025px) {
    font-size: 32px;
  }

  /* 가로 모드 또는 높이가 짧을 때 가운데 정렬 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    text-align: center;
  }
`

const GreetingSubTitle = styled.p`
  font-size: 15px;
  color: rgb(var(--greyTitle));
  line-height: 1.6;
  overflow-wrap: break-word;
  text-align: center;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: 0.85;
  
  @media (min-width: 480px) {
    font-size: 16px;
    gap: 3px;
  }
  
  @media (min-width: 1025px) {
    font-size: 18px;
    gap: 4px;
  }

  /* 가로 모드 또는 높이가 짧을 때 가운데 정렬 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    text-align: center;
  }
`

const SubTitleLine = styled.span`
  display: block;
`
const LoggedInButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* 가로 모드 또는 높이가 짧을 때 가운데 정렬 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    width: 100%;
    align-items: center;
  }
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  
  @media (min-width: 1025px) {
    gap: 20px;
  }

  /* 가로 모드 또는 높이가 짧을 때 가운데 정렬 */
  @media (orientation: landscape) and (max-height: 600px), (max-height: 600px) {
    width: 100%;
    justify-content: center;
  }
`

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid;
  padding: 0;
  
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 1025px) {
    width: 56px;
    height: 56px;
  }

  &.google {
    background-color: #ffffff;
    border-color: #e0e0e0;
  }
  
  &.kakao {
    background-color: #fee500;
    border-color: #f9d100;
  }
  
  &.naver {
    background-color: #03c75a;
    border-color: #02a84a;
  }
`

const SnsImage = styled(Image)`
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
  
  @media (min-width: 1025px) {
    width: 32px;
    height: 32px;
  }
`