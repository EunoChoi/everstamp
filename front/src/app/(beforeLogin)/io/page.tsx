'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from 'next/navigation'

//component
// import Loading from "@/component/loading";

//hooks
import IsMobile from "@/hooks/IsMobile";

//image
import loginPageImg from '/public/img/loginPageImg.jpg';


const Io = () => {
  const router = useRouter()
  const mobile = IsMobile();

  if (mobile === null) return <></>;

  return (
    <>
      {mobile ?
        <Mobile>
          <div>
            <Img src={loginPageImg} priority placeholder="blur" width={500} height={500} alt='loginPageImg'></Img>
          </div>
          <div>
            <div>
              <Mobile_TitleLogo>
                <span>ever</span>
                <span>stamp</span>
              </Mobile_TitleLogo>
              <Mobile_TitleText>
                <span>하루 하루 발전하는 삶</span>
                <span>습관과 일기를 함께 기록해요</span>
              </Mobile_TitleText>
              <Mobile_Button
              >
                <Link href='/inter/login' scroll={false}>start</Link>
              </Mobile_Button>
            </div>
          </div>
        </Mobile> :
        <Desktop>
          <div>
            <Img src={loginPageImg} alt='loginPageImg' placeholder="blur" priority></Img>
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
              <Desktop_Button
              >
                <Link href='/inter/login' scroll={false}>start</Link>
              </Desktop_Button>
            </div>
          </div>
        </Desktop >}
    </>
  );
}

export default Io;


const Mobile = styled.div`
  width: 100dvw; 
  >div:first-child{ //imageArea
    height: 65dvh;
  };
  >div:nth-child(2){
    height: 35dvh;
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

      border: rgb(var(--point2)) solid 6px;
    }
  };
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display:flex;
    >div:first-child{ //imageArea
        height: 100dvh;
        width: 100%;
      };
    >div:nth-child(2){
        height: 100dvh;
        width: 100%;
        max-width: 350px;
        >div{
          align-items: end;
          justify-content: center;
          border: rgb(var(--point2)) solid 9px;
        }
    }
  }
`
const Mobile_TitleLogo = styled.div`
  display: flex;
  flex-direction: column;
  span{
    font-size: 32px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 100%;

    color: rgb(var(--greyTitle));
  }
  span::first-letter{
    color: rgb(var(--point));
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    align-items: end;

    span{
    font-size: 48px;
    }
  }  
`
const Mobile_TitleText = styled.div`
  display: flex;
  flex-direction: column;
  
  span{
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 130%;

    color: rgb(var(--greyTitle));
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    margin: 8dvh 0;
    align-items: end;
    span{
      font-size: 20px;
    }
  }
`
const Mobile_Button = styled.button`
  cursor: pointer;

  background-color : rgb(var(--lightGrey2));
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;

  padding: 4px 20px;
  border-radius: 48px;
`

const Desktop = styled.div`
  display: flex;
  >div:first-child{
    width: 100%;
    height: 100dvh;
  };
  >div:nth-child(2){
    min-width: 450px;
    height: 100dvh;
    padding: 20px;
    >div{ //infoArea
      width: 100%;
      height: 100%;
      padding: 0px 24px;

      display: flex;
      flex-direction:column;
      justify-content: center;

      align-items: end;

      border: rgb(var(--lightGrey2)) solid 10px;
      border: rgb(var(--point2)) solid 10px;
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

    color: rgb(var(--greyTitle));
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

    color: rgb(var(--greyTitle));
  }
`
const Desktop_Button = styled.button`
  cursor: pointer;

  background-color : rgb(var(--lightGrey2));
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
  width: 100%;
  height: 100%;
  
  object-fit: cover;
`;
