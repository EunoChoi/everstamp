'use client';

import Axios from "@/Axios/axios";
import CommonBody from "@/common/components/layout/CommonBody";
import { getCurrentUser } from "@/common/fetchers/user";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import $Common from "@/common/styles/common";
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { signOut } from "next-auth/react";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import styled from "styled-components";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const SettingPage = () => {
  const router = useCustomRouter();
  const queryClient = useQueryClient();

  const FONT_SIZE_LIST = ['13px', '15px', '17px'];

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

  const fontSizeUpdate = (type: 'Up' | 'Down') => {
    const savedFontSize = localStorage.getItem('fontSize') ?? '15px';
    const currentIndex = FONT_SIZE_LIST.findIndex((v) => v === savedFontSize);
    const afterIndex = type === 'Up' ? currentIndex + 1 : currentIndex - 1;
    const afterFontSize = FONT_SIZE_LIST[afterIndex];

    console.log(afterIndex, afterFontSize);

    if (afterIndex >= 0 && afterIndex < FONT_SIZE_LIST.length) {
      localStorage.setItem('fontSize', afterFontSize);
      document.documentElement.style.setProperty('--font-size-base', afterFontSize);
    }
  }

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
      {/* <Header title='setting' /> */}
      <SettingPageBody>
        <Emtpy />
        <MainSection>
          <Title>account</Title>
          <SubSection>
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
          </SubSection>
        </MainSection>
        <MainSection>
          <Title>customize</Title>
          <SubSection>
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
          </SubSection>
          <SubSection>
            <SubTitle>other options</SubTitle>
            <FlexRow className="between">
              <span>폰트 사이즈</span>
              <FontSizeWrapper>
                <button onClick={() => fontSizeUpdate('Down')}>
                  <RemoveIcon fontSize="small" />
                </button>
                <span className="fontSize">가나다</span>
                <button onClick={() => fontSizeUpdate('Up')}>
                  <AddIcon fontSize="small" />
                </button>
              </FontSizeWrapper>
            </FlexRow>
            <FlexRow className="between">
              <span>목표 습관 리스트 정렬</span>
              <button onClick={() => { router.push('/app/inter/habitOrder', { scroll: false }) }}>
                <LowPriorityRoundedIcon fontSize="small" />
              </button>
            </FlexRow>
          </SubSection>
        </MainSection>
        <MainSection>
          <Buttons className="center">
            <Button onClick={onLogout}>로그아웃</Button>
            <Button onClick={onDeleteAccount}>계정 삭제</Button>
          </Buttons>
        </MainSection>
        <Emtpy />
      </SettingPageBody>
    </$Common.Wrapper>
  );
}

export default SettingPage;


const FontSizeWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  span{
    &.fontSize {
      text-align: center;
      width: 60px;
      font-size: var(--font-size-base);
    }
  }
`

const SettingPageBody = styled(CommonBody)`
  max-width: 500px;
`
const Emtpy = styled.div` //for align center
  flex: 1;
`
const MainSection = styled.div`
  width: 100%;
  height: auto;
  padding: 28px 0;
  gap: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  @media (max-width: 479px) { //mobile port
    padding-left : 5dvw;
    padding-right: 5dvw;
  }
`
const SubSection = styled.section`
  width: 100%;
  height: 100%;
`
const Title = styled.span`
  font-size: 28px;
  font-weight: 500;
  color: rgb(var(--greyTitle));

  text-transform: capitalize;
`
const SubTitle = styled.span`
  display : block;
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
  margin : 0 12px;
  margin-bottom: 10px;
  color: grey;
`
const Value = styled.span`
  font-size: 16px;
  /* font-weight: 500; */
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

  span, button{
    color: darkgrey;
    /* font-size: 18px; */
    font-size: 16px;
    /* font-weight: 500; */
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
  /* font-weight: 500; */
  text-transform: capitalize;
  
  &:hover{
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
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
`