'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import tree from '/public/img/tree.png';
import emotions from '/public/img/emotion/emotions.png';


const Page = () => {
  return (
    <Wrapper>
      <Logo>
        <span>ever</span>
        <span>stamp</span>
        <span className="sub">grow every day</span>
      </Logo>

      <Img src={emotions} priority width={800} height={800} alt='emotions'></Img>

      <TextContent>
        <span>감정일기와 습관을 한곳에서 관리하고</span>
        <span>당신의 변화와 성장을 기록해보세요</span>
      </TextContent>
      <Link href='/app/calendar' scroll={false}><Button>start</Button></Link>
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
  width: 250px;
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
const Button = styled.button`
  cursor: pointer;

  background-color : #979FC7;
  color: #EFF0F6;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;

  padding: 4px 20px;
  border-radius: 48px;
  @media (min-width:1024px) { //desktop
    font-size: 18px;
  }
`
