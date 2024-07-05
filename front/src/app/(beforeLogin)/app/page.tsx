'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import tree from '/public/img/tree.png';


const Page = () => {
  return (
    <Wrapper>
      <Logo>
        <span>ever</span>
        <span>stamp</span>
      </Logo>
      <Img src={tree} priority width={100} height={100} alt='tree'></Img>
      <TextContent>
        <span>Stamp daily habits in diary</span>
        <span>for lifelong your growth</span>
      </TextContent>
      <Link href='/app/inter/login' scroll={false}><Button>start</Button></Link>
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

  background-color: #979FC7;

 
  @media (max-width: 479px) { //mobile port
    >*{ margin: 16px  0; }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    >*{ margin: 8px  0; }
  }
  @media (min-width:1024px) { //desktop
    >*{ margin: 24px  0; }
  }
`

const Img = styled(Image)`
  object-fit: contain;
  @media (max-width: 479px) { //mobile port
    width: 150px;
    height: 150px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 100px;
    height: 100px;
  }
  @media (min-width:1024px) { //desktop
    width: 180px;
    height: 180px;
  }
`;


const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  span{
    text-align: center;
    color: rgb(var(--greyTitle));
    font-weight: 500;
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
    color: whitesmoke;
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

  background-color : whitesmoke;
  color: rgb(var(--greyTitle));
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;

  padding: 4px 20px;
  border-radius: 48px;
  @media (min-width:1024px) { //desktop
    font-size: 18px;
  }
`
