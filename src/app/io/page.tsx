'use client';

import Image from "next/image";
import styled from "styled-components";
import { useRouter } from 'next/navigation'

//hooks
import IsMobile from "@/hooks/IsMobile";

//image
import loginPageImg from '/public/img/loginPageImg.jpg';



const Io = () => {
  const router = useRouter()
  const mobile = IsMobile();

  return (
    <>
      {mobile ?
        <Mobile>
          <div>
            <Img src={loginPageImg} alt='loginPageImg'></Img>
          </div>
          <div>
            <div>
              <Mobile_TitleLogo>
                <span>ever</span>
                <span>stamp</span>
              </Mobile_TitleLogo>
              <Mobile_TitleText>
                <span>하루 하루 발전하는 삶</span>
                <span>습관과 일기를 함께 기록해요 :)</span>
              </Mobile_TitleText>
              <Mobile_Button onClick={() => {
                router.push('/io/calendar');
              }}>
                start
              </Mobile_Button>
            </div>
          </div>
        </Mobile> :
        <Desktop>
          <div>
            <Img src={loginPageImg} alt='loginPageImg'></Img>
          </div>
          <div>
            <div>
              <Desktop_TitleLogo>
                <span>ever</span>
                <span>stamp</span>
              </Desktop_TitleLogo>
              <Desktop_TitleText>
                <span>하루 하루 발전하는 삶</span>
                <span>습관과 일기를 함께 기록해요</span>
              </Desktop_TitleText>
              {/* <Desktop_Button onClick={() => {
                router.push('/io/calendar');
              }}> */}
              <Desktop_Button popoverTarget="popup">
                start
              </Desktop_Button>
            </div>
          </div>
        </Desktop >}
      <Login popover="" id="popup">popover test</Login >
    </>
  );
}

export default Io;

const Login = styled.div`
  /* background-color: white;
  border-radius: 16px;
  box-shadow: 0px 16px 32px grey; */
  &:popover-open{
    width: 500px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
  }
`

const Mobile = styled.div`
  >div:first-child{ //imageArea
    height: 65vh;
  };
  >div:nth-child(2){
    height: 35vh;
    background-color: white;
    padding: 10px;
    >div{ //infoArea
      width: 100%;
      height: 100%;
      padding: 20px;

      display: flex;
      flex-direction:column;
      justify-content: space-around;
      align-items: start;

      border: rgb(var(--lightGrey_CP)) solid 6px;
    }
  };
`
const Mobile_TitleLogo = styled.div`
  display: flex;
  flex-direction: column;
  span{
    font-size: 32px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 100%;

    color: rgb(var(--grey_Title));
  }
  span::first-letter{
    color: rgb(var(--point));
  }
`
const Mobile_TitleText = styled.div`
  display: flex;
  flex-direction: column;
  span{
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 130%;

    color: rgb(var(--grey_Title));
  }
`
const Mobile_Button = styled.button`
  cursor: pointer;

  background-color : rgb(var(--lightGrey_CP));
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;

  padding: 4px 20px;
  border-radius: 48px;
`

const Desktop = styled.div`
  display: flex;
  >div:first-child{
    width: 65vw;
    height: 100vh;
  };
  >div:nth-child(2){
    /* width: 35vw; */
    min-width: 35vw;
    height: 100vh;
    padding: 20px;
    >div{ //infoArea
      width: 100%;
      height: 100%;
      padding: 0px 4vw;

      display: flex;
      flex-direction:column;
      justify-content: center;

      align-items: end;

      border: rgb(var(--lightGrey_CP)) solid 10px;
    }
  };
`
const Desktop_TitleLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  span{
    font-size: 64px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 100%;

    color: rgb(var(--grey_Title));
  }
  span::first-letter{
    color: rgb(var(--point));
  }
`
const Desktop_TitleText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 64px 0;
  span{
    /* white-space: nowrap; */
    /* text-wrap: balance; */
    font-size: 22px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 150%;

    color: rgb(var(--grey_Title));
  }
`
const Desktop_Button = styled.button`
  cursor: pointer;

  background-color : rgb(var(--lightGrey_CP));
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;

  padding: 6px 24px;
  border-radius: 48px;
  transition: all ease-in-out 0.3s;
  &:hover{
    background-color: rgb(var(--point));
  }
`

const Img = styled(Image)`
  height: 100%;
  object-fit: cover;
`;
