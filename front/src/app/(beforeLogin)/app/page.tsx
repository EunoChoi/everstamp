'use client';

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import tree from '/public/img/tree.png';


const Page = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <span>Grow everyday</span>
        <Img src={tree} priority width={500} height={500} alt='tree'></Img>
      </ImageWrapper>
      <TextWrapper>

        <Logo>
          <span>ever</span>
          <span>stamp</span>
        </Logo>

        <TextContent>
          <span>Stamp daily habits in diary</span>
          <span>for lifelong your growth</span>
        </TextContent>

        <Link href='/app/inter/login' scroll={false}><Button>start</Button></Link>

      </TextWrapper>
    </Wrapper>
  );
}

export default Page;

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  display:flex;
  @media (max-width: 479px) { //mobile port
    flex-direction: column;
  }
`
const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;
  
  background-color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
  span{
      color: rgb(var(--greyTitle2));
      font-size: 24px;
      font-weight: 600;
      text-transform: capitalize;
  }

  @media (max-width: 479px) { //mobile port
    height: 100%;
    
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 100%;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    width: 100%;
    span{
      font-size: 30px;
  }
  }
`
const Img = styled(Image)`
  width: 80%;
  height: 50%;
  
  object-fit: contain;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  @media (max-width: 479px) { //mobile port
    height: 400px;
    padding: 0 32px;
    justify-content: space-evenly;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    width: 450px;
    padding: 0 32px;
    align-items: end;
    span{
      text-align: end;
    }
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    width: 550px;
    padding: 0 48px;
    align-items: end;
    span{
      text-align: end;
    }
  }
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  span{
    font-weight: 700;
    text-transform: uppercase;
    line-height: 100%;

    color: rgb(var(--greyTitle));
  }
  span::first-letter{
    color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
  }
  @media (max-width: 479px) { //mobile port
    font-size: 36px;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 42px;
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    font-size: 56px;
  }
`
const TextContent = styled.div`
  display: flex;
  flex-direction: column;

  span{
    color: rgb(var(--greyTitle));
    font-weight: 500;
    line-height: 130%;    
  }

  @media (max-width: 479px) { //mobile port
    /* padding: 24px 0; */
    span{
      font-size: 18px;
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    padding: 32px 0;
    span{
      font-size: 18px;
    }
  }
  @media (min-height:480px) and (min-width:1024px) { //desktop
    padding: 72px 0;
    span{
      line-height: 150%;    
      font-size: 22px;
    }
  }
`
const Button = styled.button`
  cursor: pointer;

  background-color : rgb(var(--lightGrey2));
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;

  padding: 4px 20px;
  border-radius: 48px;

  @media (min-height:480px) and (min-width:1024px) { //desktop
    padding: 6px 24px;
    font-size: 20px;
  }
`
