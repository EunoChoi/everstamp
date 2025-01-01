'use client';

import { useCustomRouter } from "@/common/function/customRouter";
import $Common from "@/common/style/common";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  title: string;
  children?: ReactNode;
  classname?: string;
}

const Header = ({ title, children, classname }: Props) => {
  const router = useCustomRouter();

  const GoIntroText = () => (
    <div>
      <p>소개 페이지로 이동하시겠습니까?</p>
      <p style={{ fontSize: '15px', marginTop: '8px', color: '#DC7889' }}>🚨 소개 페이지 내부 '웹에서 실행하기' 버튼을 눌러 앱 화면으로 돌아올 수 있습니다.</p>
    </div>
  );
  const goIntro = () => {
    const action = (snackbarId: SnackbarKey) => (
      <>
        <$Common.YesOrNo className="no" onClick={() => {
          closeSnackbar('goIntro');
        }}>
          No
        </$Common.YesOrNo>
        <$Common.YesOrNo className="yes" onClick={() => {
          closeSnackbar('goIntro');
          router.push('/')
        }}>
          Yes
        </$Common.YesOrNo>
      </>
    );
    enqueueSnackbar(<GoIntroText />, { key: 'goIntro', persist: true, action, autoHideDuration: 6000 });
  }

  return (
    <Wrapper className={classname}>
      <Title onClick={goIntro}>{title}</Title>
      {children}
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;

  background-color: white;

  @media (max-width: 479px) { //mobile port
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: var(--mobileHeader);
    padding: 0 5%;
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    justify-content: end;
    align-items: center;
    width: 75dvw;
    padding: 0 20px;
  }
  @media (min-width:1024px) { //desktop
    align-items: center;
    justify-content: space-between;
    width: calc(100dvw - var(--sidebarWidth));
    height: var(--desktopHeader);
    padding: 0 48px;
  }
`
const Title = styled.span`
  color: rgb(var(--greyTitle));
  font-weight: 700;

  text-transform: uppercase;

  &:first-letter{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  @media (max-width: 479px) { //mobile port
    line-height: 0.9;
    font-size: 24px;
    border-bottom: 4px ${(props) => props.theme.point ? props.theme.point : '#979FC7'} solid;
    &:first-letter{
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    display: none;
  }
  @media (min-width:1024px) { //desktop
    font-size: 36px;
  }
`