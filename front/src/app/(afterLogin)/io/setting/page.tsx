'use client';

import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import { getCurrentUser } from "../../_lib/geCurrentUser";
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

//component
import Header from "@/component/Header";

//styledComponent
import SC_Common from "@/style/common";


const Setting = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const { data } = useQuery({
    queryKey: ['user', email ? email : ''],
    queryFn: getCurrentUser
  })

  return (
    <SC_Common.Wrapper>
      <SC_Common.Content
        // className="scroll noOption"
        className="noOption"
      >
        <Header title='setting' />
        <SC_Common.Options className="setting" />
        <Section>
          <Title>account</Title>
          <Value>
            <span className="key">email</span>
            <span className="value">{data?.email}</span>
          </Value>
          <Value>
            <span className="key">provider</span>
            <span className="value">{data?.provider}</span>
          </Value>
          <Value>
            <span className="key">creation date</span>
            <span className="value">{data?.createdAt && format(data?.createdAt, 'yyyy.mm.dd')}</span>
          </Value>
          <Buttons>
            <Button onClick={() => signOut()}>logout</Button>
            <Button>delete account</Button>
          </Buttons>
        </Section>

        <Section>
          <Title>theme</Title>
          <SubTitle>foreground color</SubTitle>
          <FlexRow>
            <Check></Check>
            <FlexRow className="end">
              <Check></Check>
              <Check></Check>
              <Check></Check>
            </FlexRow>
          </FlexRow>

          {/* <SubTitle>background color</SubTitle>
          <FlexRow>
            <Check></Check>
            <FlexRow className="end">
              <Check></Check>
              <Check></Check>
            </FlexRow>
          </FlexRow> */}

        </Section>

      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default Setting;

const Section = styled.div`
  width: 100%;
  height: auto;
  padding: 36px 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

`
const Title = styled.span`
  font-size: 28px;
  font-weight: 600;
  color: rgb(var(--greyTitle));

  text-transform: capitalize;
  /* text-transform: uppercase; */

  padding-bottom: 16px;
`
const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
  margin: 12px;
  /* margin-bottom: 0px; */

  color: grey;
`
const Value = styled.span`
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  width: inherit;
  padding: 4px 12px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  .key{
    font-weight: 600;
    text-transform: capitalize;
    color :grey;
  }
  .value{
    color: grey;
    color: darkgrey
  }
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding-left: 12px;
`

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  width: 100%;
  padding: 4px 12px;
  
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
    display: none;
  }

  &.end{
    justify-content: end;
    padding: 4px 0px;
    *:last-child{
      margin-right: 0;
    }
  }
`
const Button = styled.button`
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  padding: 4px 14px;


  border-radius: 50px;
  border: 1px solid rgba(0,0,0,0.05);
  background-color: whitesmoke;
  color: rgb(var(--greyTitle));
 

  margin-right: 8px;
  font-weight: 500;
  text-transform: capitalize;
  
  &:hover{
    background-color: rgb(var(--point2));
  }
`
const Check = styled.div`
  width: 36px;
  height: 36px;
  border: solid 3px darkgrey;
  margin-right: 8px;
  transition: all ease-in-out 0.3s;

  flex-shrink: 0;

  border-radius: 8px;
  &:hover{
    border-color: rgb(var(--point));
  }
`