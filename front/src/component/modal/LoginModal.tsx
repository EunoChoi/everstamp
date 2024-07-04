'use client';

import Image from "next/image";
import styled from "styled-components";
import { signIn } from "next-auth/react";



//image
import google from '/public/img/google.png';
import kakao from '/public/img/kakao.png';
import naver from '/public/img/naver.png';
import { useCallback } from "react";
import { getCleanTodayTime } from "@/function/getCleanTodayTime";
import { useRouter } from "next/navigation";

const LoginModal = () => {

  const router = useRouter();
  const options = { callbackUrl: `/app/calendar?date=${getCleanTodayTime()}` };

  return (
    <Wrapper onClick={() => router.back()}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Logo>
          <span>ever</span>
          <span>stamp</span>
        </Logo>

        <TextWrapper>
          <Title>sns 로그인</Title>
          <Text>간편 로그인 및 가입이 가능합니다.</Text>
        </TextWrapper>

        <Buttons>
          <Button
            className="google"
            onClick={() => signIn('google', options, { prompt: 'consent' })}>
            <Images src={google} alt='google' width={50} height={50} />
          </Button>
          <Button
            className="kakao"
            onClick={() => signIn('kakao', options, { prompt: 'select_account' })}>
            <Images src={kakao} alt='kakao' width={50} height={50} />
          </Button>
          <Button
            className="naver"
            onClick={() => signIn('naver', options)}>
            <Images src={naver} alt='naver' width={50} height={50} />
          </Button>
        </Buttons>
      </Modal>
    </Wrapper>
  );
}

export default LoginModal;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;
  width: 100dvw;
  height: 100dvh;

  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);

  * {
    text-transform: uppercase;
    color: rgb(var(--greyTitle));
  }
`
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 64px rgba(0,0,0,0.2);

  @media (max-width: 479px) { //mobile port
    width: 90%;
    height: 60%;
    max-height: 500px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 50%;
    min-width: 450px;
    height: 80%;
    max-height: 500px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    width: 50%;
    height: 60%;
  }
`
const Logo = styled.div`
  font-weight: 700;
  color: rgb(var(--greyTitle));
  span{
    display: inline-block;
    padding: 0 4px;
    &::first-letter{
      color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
    }
  }  
  @media (max-width: 479px) { //mobile port
    font-size: 32px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 32px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    font-size: 48px;
  }
`
const Title = styled.span`
  font-weight: 600;
  @media (max-width: 479px) { //mobile port
    font-size: 22px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 22px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    font-size: 28px;
  }
`
const Text = styled.span`
  font-weight: 500;
  @media (max-width: 479px) { //mobile port
      font-size: 18px;
      margin-top: 8px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      font-size: 16px;
      margin-top: 4px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
      font-size: 18px;
      margin-top: 8px;
  }
`
const Buttons = styled.div`
  display: flex;
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width : 42px;
  height: 42px;
  border-radius: 42px;
  border : 2px solid rgba(0,0,0,0.05);
  margin: 4px;

  @media (min-height:480px) and (min-width:1024px) { //desktop
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
const Images = styled(Image)`
  width: 70%;
  height: 70%;
  object-fit: cover;
`