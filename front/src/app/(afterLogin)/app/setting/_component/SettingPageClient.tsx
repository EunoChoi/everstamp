'use client';

import styled from "styled-components";
import { signOut } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';


//function
import { getCurrentUser } from "@/app/(afterLogin)/_lib/user";

//component
import Header from "@/component/Header";

import SC_Common from "@/style/common";
import Axios from "@/Aixos/aixos";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { useState } from "react";



const SettingPageClient = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

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
      <SC_Common.Content className="noOption setting" >
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
            <span className="value">{data?.createdAt && format(data?.createdAt, 'yyyy.MM.dd')}</span>
          </Value>
          <Buttons>
            <Button onClick={onLogout}>logout</Button>
            <Button onClick={onDeleteAccount}>delete account</Button>
          </Buttons>
        </Section>

        <Section>
          <Title>theme</Title>
          <SubTitle>foreground color</SubTitle>
          <FlexRow>
            <Color className="selected" />
            <FlexRow className="end">
              <Color className="purple" onClick={() => themeColorUpdate("#9797CB")} />
              <Color className="blue" onClick={() => themeColorUpdate("#8EBCDB")} />
              <Color className="green" onClick={() => themeColorUpdate("#83c6b6")} />
              <Color className="pink" onClick={() => themeColorUpdate("#eda5b1")} />
              <Color className="grey" onClick={() => themeColorUpdate("#8f8f8f")} />
            </FlexRow>
          </FlexRow>
        </Section>

      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default SettingPageClient;


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
    background-color: ${(props) => props.theme.point ? props.theme.point + 'd0' : '#9797CB'};
  }
`
const Color = styled.div`
  width: 36px;
  height: 36px;
  border: solid 3px rgba(0,0,0,0.2);
  margin-right: 8px;
  transition: all ease-in-out 0.3s;

  flex-shrink: 0;

  border-radius: 8px;


  &.selected{
    background-color: ${(props) => props.theme.point ? props.theme.point : '#9797CB'};
  }

  &.purple{
    background-color: #9797CB;
  }
  &.blue{
    background-color: rgb(142, 188, 219);
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