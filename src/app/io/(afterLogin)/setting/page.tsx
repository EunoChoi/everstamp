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
          <Title>user</Title>
          <Text>id : k_pixel@kakao.com</Text>
          <Text>social : kakao</Text>
          <FlexRow>
            <Button>logout</Button>
            <Button>delete account</Button>
          </FlexRow>
        </Section>

        <Section>
          <Title>theme</Title>
          <Text>point color</Text>
          <FlexRow>
            <input type="checkbox"></input>
            <input type="checkbox"></input>
            <input type="checkbox"></input>
          </FlexRow>

          <Text>dark theme</Text>
          <FlexRow>
            <input type="checkbox"></input>
            <input type="checkbox"></input>
          </FlexRow>
          <Text>font size</Text>
          <FlexRow>
            <input type="checkbox"></input>
            <input type="checkbox"></input>
            <input type="checkbox"></input>
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
`
const Text = styled.span`
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

  padding: 2px 14px;
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