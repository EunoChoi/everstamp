'use client';

import styled from "styled-components";
import { signOut } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Axios from "@/Axios/axios";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";

import emotion4 from '/public/img/emotion/emotion4.png'

//style
import $Common from "@/style/common";

//function
import { getCurrentUser } from "@/function/fetch/user";

//component
import Header from "@/component/common/Header";
import ContentArea from "@/component/common/ContentArea";
import React, { useEffect } from "react";


import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import Image from "next/image";
import { useCustomRouter } from "@/function/customRouter";

const SettingPageClient = () => {
  const router = useCustomRouter();
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
        <$Common.YesOrNo className="no" onClick={() => { closeSnackbar('logout'); }}>
          No
        </$Common.YesOrNo>
        <$Common.YesOrNo className="yes" onClick={() => {
          Axios.get('user/logout').then(() => { signOut(); });
          closeSnackbar('logout');
        }}>
          Yes
        </$Common.YesOrNo>
      </>
    );
    enqueueSnackbar('로그아웃 하시겠습니까?', { key: 'logout', persist: true, action: logoutAction, autoHideDuration: 6000 });
  }
  const onDeleteAccount = () => {
    const userDeleteAction = (snackbarId: SnackbarKey) => (
      <>
        <$Common.YesOrNo className="no" onClick={() => { closeSnackbar('userDelete'); }}>
          No
        </$Common.YesOrNo>
        <$Common.YesOrNo className="yes" onClick={() => {
          Axios.delete('user').then(() => { signOut(); });
          closeSnackbar('userDelete');
        }}>
          Yes
        </$Common.YesOrNo>
      </>
    );
    enqueueSnackbar('회원탈퇴 하시겠습니까?', { key: 'userDelete', persist: true, action: userDeleteAction, autoHideDuration: 6000 });
  }

  const themeColorUpdate = (themeColor: string) => {
    themeColorUpdateMutation.mutate(themeColor);
  }

  //production mode에서만 동작, 정적 자료만 prefetch
  useEffect(() => {
    router.prefetch('/app/calendar');
    router.prefetch('/app/list');
    router.prefetch('/app/habit');
  }, [])

  return (
    <$Common.Wrapper>
      <Header title='setting' />
      <ContentArea>
        <EmtpyBox />
        <Section>
          <Title>account</Title>
          <Value>
            <span className="key">이메일</span>
            <span className="value email">{data?.email}</span>
          </Value>
          <Value>
            <span className="key">계정 타입</span>
            <span className="value">{data?.provider}</span>
          </Value>
          <Value>
            <span className="key">가입일</span>
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
            <span>목표 습관 리스트 정렬</span>
            <button onClick={() => { router.push('/app/inter/habitOrder', { scroll: false }) }}>
              <LowPriorityRoundedIcon className="icon" fontSize="small" />
            </button>
          </FlexRow>
          <FlexRow className="between">
            <span>감정 아이콘 이미지</span>
            <button onClick={() => {
              // router.push('/app/inter/habitOrder', { scroll: false })
            }}>
              <Image src={emotion4} alt="emotion icon" width={28} height={28} />
            </button>
          </FlexRow>
        </Section>
        <Section>
          <Buttons className="center">
            <Button onClick={onLogout}>로그아웃</Button>
            <Button onClick={onDeleteAccount}>계정 삭제</Button>
          </Buttons>
        </Section>
        <EmtpyBox />
      </ContentArea>
    </$Common.Wrapper>
  );
}

export default SettingPageClient;


const EmtpyBox = styled.div` //for align center
  flex: 1;
`
const EmptyBar = styled.div`
  width: 100%;
  height: 20px;
`
const Section = styled.div`
  width: 100%;
  height: auto;
  padding: 28px 0;

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
  font-size: 16px;
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
    /* color: darkgrey */
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
    /* font-size: 18px; */
    font-size: 16px;
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


  /* &:hover{
    border-color: rgba(0,0,0,0.4);
  } */
`