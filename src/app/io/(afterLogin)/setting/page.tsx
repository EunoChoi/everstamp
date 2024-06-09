'use client';

import styled from "styled-components";

//component
import Header from "@/component/header";

const Setting = () => {
  return (
    <Wrapper>
      <Header subTitle="" />
      <Content>
        <Section>
          <Title>account</Title>
          <SubTitle>id : k_pixel@kakao.com</SubTitle>
          <SubTitle>type : kakao</SubTitle>
          <FlexRow>
            <Button>logout</Button>
            <Button>delete account</Button>
          </FlexRow>
        </Section>

        <Section>
          <Title>theme</Title>
          <SubTitle>point color</SubTitle>
          <FlexRow>
            <Check></Check>
            <Check></Check>
            <Check></Check>
          </FlexRow>

          <SubTitle>dark theme</SubTitle>
          <FlexRow>
            <Check></Check>
            <Check></Check>
          </FlexRow>
          <SubTitle>font size</SubTitle>
          <FlexRow>
            <Check></Check>
            <Check></Check>
            <Check></Check>
          </FlexRow>
        </Section>

      </Content>
    </Wrapper>
  );
}

export default Setting;

const Wrapper = styled.div`
  padding: 0 20px;
  width: 100%;
  max-width: 600px;
  min-width: 400px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  @media screen and (max-width: 720px) {
    min-width: 90%;
    padding: 0;
  }
`
const Content = styled.div`
  width: 100%;
  height: calc(100vh - var(--mobileHeader));
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  //mobile
  @media screen and (max-width: 720px) {
    height: calc(100vh - var(--mobileHeader) - var(--mobileNav));
    padding: 0 5vw;
  }
`
const Section = styled.div`
  width: 100%;
  height: auto;
  padding: 24px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  *{
    padding: 6px 0;
  }
`
const Title = styled.span`
  font-size: 32px;
  font-weight: 600;
  color: rgb(var(--grey_Title));

  text-transform: capitalize;
  /* text-transform: uppercase; */
`
const SubTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: rgb(var(--grey_Title));
  color: grey;

  text-transform: capitalize;
`

const FlexRow = styled.div`
  display: flex;
`
const Button = styled.button`
  cursor: pointer;
  transition: all ease-in-out 0.3s;

  padding: 0 14px;
  height: 36px;

  border-radius: 50px;
  border: solid 4px grey;
  margin-right: 8px;

  font-weight: 500;
  text-transform: capitalize;
  color: grey;
  &:hover{
    border: solid 4px rgb(var(--point));
    color: rgb(var(--point));
  }
`
const Check = styled.div`
  width: 36px;
  height: 36px;
  border: solid 4px grey;
  margin-right: 8px;
  transition: all ease-in-out 0.3s;

  border-radius: 8px;
  &:hover{
    border: solid 4px rgb(var(--point));
    color: rgb(var(--point));
  }
`