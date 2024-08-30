'use client';

import styled from "styled-components";
import { signOut } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Axios from "@/Axios/axios";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";

import emotion4 from '/public/img/emotion/emotion4.png'

//style
import SC_Common from "@/style/common";

//function
import { getCurrentUser } from "@/app/(afterLogin)/_lib/user";

//component
import Header from "@/component/common/Header";
import ContentArea from "@/component/common/ContentArea";
import React from "react";
import { useRouter } from "next/navigation";


import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import Image from "next/image";

const SettingPageClient = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

  const colorName = ['purple', 'blue', 'green', 'pink', 'grey'];
  const colorValue = ['#979FC7', '#8CADE2', '#83c6b6', '#eda5b1', '#8f8f8f'];


  const themeColorUpdateMutation = useMutation({
    mutationFn: (themeColor: string) => Axios.patch('/user/theme', { themeColor }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      console.log('theme update success');
    },
    onError: () => {
      console.log('theme update error')
    },
  })

  const onLogout = () => {
    const logoutAction = (snackbarId: SnackbarKey) => (
      <>
        <SC_Common.YesOrNo className="no" onClick={() => { closeSnackbar('logout'); }}>
          No
        </SC_Common.YesOrNo>
        <SC_Common.YesOrNo className="yes" onClick={() => {
          Axios.get('user/logout').then(() => { signOut(); });
          closeSnackbar('logout');
        }}>
          Yes
        </SC_Common.YesOrNo>
      </>
    );
    enqueueSnackbar('로그아웃 하시겠습니까?', { key: 'logout', persist: true, action: logoutAction, autoHideDuration: 6000 });
  }
  const onDeleteAccount = () => {
    const userDeleteAction = (snackbarId: SnackbarKey) => (
      <>
        <SC_Common.YesOrNo className="no" onClick={() => { closeSnackbar('userDelete'); }}>
          No
        </SC_Common.YesOrNo>
        <SC_Common.YesOrNo className="yes" onClick={() => {
          Axios.delete('user').then(() => { signOut(); });
          closeSnackbar('userDelete');
        }}>
          Yes
        </SC_Common.YesOrNo>
      </>
    );
    enqueueSnackbar('회원탈퇴 하시겠습니까?', { key: 'userDelete', persist: true, action: userDeleteAction, autoHideDuration: 6000 });
  }

  const themeColorUpdate = (themeColor: string) => {
    themeColorUpdateMutation.mutate(themeColor);
  }

  return (
    <SC_Common.Wrapper>
      <Header title='setting' />
      <ContentArea>
        <SettingContainer>
          <Section>
            <Title>account</Title>
            <Value>
              <span className="key">email</span>
              <span className="value email">{data?.email}</span>
            </Value>
            <Value>
              <span className="key">provider</span>
              <span className="value">{data?.provider}</span>
            </Value>
            <Value>
              <span className="key">creation date</span>
              <span className="value">{data?.createdAt && format(data?.createdAt, 'yyyy.MM.dd')}</span>
            </Value>
          </Section>

          <Section>
            <Title>customize</Title>
            <SubTitle>theme color</SubTitle>
            <FlexRow>
              <Color className="selected" />
              <FlexRow className="end">
                {colorValue.map((e, i) =>
                  <Color
                    key={colorName[i] + 'Color'}
                    className={colorName[i]}
                    onClick={() => themeColorUpdate(e)}
                  />)}
              </FlexRow>
            </FlexRow>
            <EmptyBar />
            <SubTitle>others</SubTitle>
            <FlexRow className="between">
              <span>habit list order</span>
              <button onClick={() => { router.push('/app/inter/habitOrder', { scroll: false }) }}>
                <LowPriorityRoundedIcon className="icon" fontSize="small" />
              </button>
            </FlexRow>
            <FlexRow className="between">
              <span>Emotion icon type</span>
              <button onClick={() => {
                // router.push('/app/inter/habitOrder', { scroll: false })
              }}>
                <Image src={emotion4} alt="emotion icon" width={28} height={28} />
              </button>
            </FlexRow>
          </Section>

          <Section>
            <Buttons className="center">
              <Button onClick={onLogout}>logout</Button>
              <Button onClick={onDeleteAccount}>delete account</Button>
            </Buttons>
          </Section>

        </SettingContainer>
      </ContentArea>
    </SC_Common.Wrapper>
  );
}

export default SettingPageClient;
const EmptyBar = styled.div`
  width: 100%;
  height: 20px;
`
const SettingContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: scroll;

  @media (min-width:480px) and (max-width:1023px) and (max-height:480px) { //only mobild land
    justify-content: start;
  }
`
const Section = styled.div`
  width: 100%;
  height: auto;
  padding: 36px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  @media (max-width: 479px) { //mobile port
    padding-left : 5dvw;
    padding-right: 5dvw;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    max-width: 600px;
  }
  @media (min-width:1024px) { //desktop
  }
`
const Title = styled.span`
  font-size: 28px;
  font-weight: 600;
  color: rgb(var(--greyTitle));

  text-transform: capitalize;
  padding-bottom: 16px;
`
const SubTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
  margin : 6px 12px;

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
  .email{
    margin-left: 12px;
    overflow-x: scroll;
  }
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
  &.center{
    width: 100%;
    justify-content: center;
  }
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
  &.between{
    justify-content: space-between
  }

  span{
    color: darkgrey;
    font-size: 18px;
    font-weight: 500;
  }
  .icon{
    color: darkgrey;
    width: 28px;
    height: 28px;
  }
`
const Button = styled.button`
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  padding: 4px 14px;
  font-size: 14px;


  border-radius: 50px;
  border: 2px solid rgba(0,0,0,0.05);
  background-color: #f9f9f9;
  color: rgb(var(--greyTitle));
 

  margin-right: 8px;
  font-weight: 500;
  text-transform: capitalize;
  
  &:hover{
    background-color: ${(props) => props.theme.point ? props.theme.point + 'd0' : '#979FC7'};
  }
`
const Color = styled.div`
  width: 36px;
  height: 36px;
  border: solid 2px rgba(0,0,0,0.2);
  margin-right: 8px;
  transition: all ease-in-out 0.3s;

  flex-shrink: 0;

  border-radius: 8px;


  &.selected{
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }

  &.purple{
    background-color: #979FC7;
  }
  &.blue{
    background-color: #8CADE2;
  }
  &.pink{
    background-color: #eda5b1;
  }
  &.green{
    background-color: #83c6b6;
  }
  &.grey{
    background-color: #8f8f8f;
  }


  &:hover{
    border-color: rgba(0,0,0,0.4);
  }
`